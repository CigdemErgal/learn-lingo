import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header/Header";
import HomePage from "../pages/HomePage/HomePage";
import TeachersPage from "../pages/TeachersPage/TeachersPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import css from "./App.module.css";
import AuthModal from "../components/AuthModal/AuthModal";
import useAuth from "../hooks/useAuth";
import { signOutUser } from "../firebase/auth";

type AuthModalType = "login" | "register" | null;

function App() {
  const [authModalType, setAuthModalType] = useState<AuthModalType>(null);
  const { user, isLoading } = useAuth();

  const handleLogOut = async () => {
    await signOutUser();
  };

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
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <AuthModal
        modalType={authModalType}
        onClose={() => setAuthModalType(null)}
      />
    </div>
  );
}

export default App;
