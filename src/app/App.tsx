import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import HomePage from "../pages/HomePage/HomePage";
import TeachersPage from "../pages/TeachersPage/TeachersPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import css from "./App.module.css";
import AuthModal from "../components/AuthModal/AuthModal";
import useAuth from "../hooks/useAuth";
import { signOutUser } from "../firebase/auth";
import {
  clearLocalFavorites,
  getLocalFavorites,
  getUserFavorites,
  isFavoritesUsingLocalFallback,
  saveUserFavorites,
} from "../firebase/favorites";

type AuthModalType = "login" | "register" | null;

function App() {
  const [authModalType, setAuthModalType] = useState<AuthModalType>(null);
  const { user, isLoading } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesReady, setIsFavoritesReady] = useState(false);

  const handleLogOut = async () => {
    await signOutUser();
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      setFavorites([]);
      setIsFavoritesReady(true);
      return;
    }

    const currentUser = user;
    let isMounted = true;

    async function loadFavorites() {
      setIsFavoritesReady(false);

      try {
        const loadedFavorites = await getUserFavorites(currentUser.uid);
        const localFavorites = getLocalFavorites();
        const mergedFavorites = Array.from(
          new Set([...loadedFavorites, ...localFavorites]),
        );

        if (!isFavoritesUsingLocalFallback()) {
          await saveUserFavorites(currentUser.uid, mergedFavorites);
          clearLocalFavorites();
        }

        if (!isMounted) {
          return;
        }

        setFavorites(mergedFavorites);
      } finally {
        if (isMounted) {
          setIsFavoritesReady(true);
        }
      }
    }

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, [user, isLoading]);

  useEffect(() => {
    if (!user || !isFavoritesReady) {
      return;
    }

    saveUserFavorites(user.uid, favorites);
  }, [favorites, user, isFavoritesReady]);

  return (
    <div className={css.app}>
      <Header
        user={user}
        isLoading={isLoading}
        onLoginClick={() => setAuthModalType("login")}
        onRegisterClick={() => setAuthModalType("register")}
        onLogoutClick={handleLogOut}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/teachers"
          element={
            <TeachersPage
              favorites={favorites}
              setFavorites={setFavorites}
              onRequireAuth={() => setAuthModalType("login")}
              isAuthenticated={Boolean(user)}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            isLoading ? null : user ? (
              <FavoritesPage
                favorites={favorites}
                setFavorites={setFavorites}
                onRequireAuth={() => setAuthModalType("login")}
                isAuthenticated={Boolean(user)}
              />
            ) : (
              <Navigate to="/teachers" replace />
            )
          }
        />
      </Routes>
      <AuthModal
        modalType={authModalType}
        onClose={() => setAuthModalType(null)}
      />
    </div>
  );
}

export default App;
