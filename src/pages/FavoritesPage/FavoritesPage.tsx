import { useEffect, useState } from "react";
import type { Teacher } from "../../types/teacher";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./FavoritesPage.module.css";
import { getAllTeachers } from "../../firebase/teachers";

interface FavoritesPageProps {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  onRequireAuth: () => void;
  isAuthenticated: boolean;
}

function FavoritesPage({
  favorites,
  setFavorites,
  onRequireAuth,
  isAuthenticated,
}: FavoritesPageProps) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTeachers() {
      setIsLoading(true);
      setError("");

      try {
        const loadedTeachers = await getAllTeachers();

        if (!isMounted) {
          return;
        }

        setTeachers(loadedTeachers);
      } catch {
        if (!isMounted) {
          return;
        }

        setError("Unable to load favorite teachers right now.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadTeachers();

    return () => {
      isMounted = false;
    };
  }, []);

  const favoriteTeachers: Teacher[] = teachers.filter((teacher) =>
    favorites.includes(`${teacher.name} ${teacher.surname}`),
  );

  const handleToggleFavorite = (teacher: Teacher) => {
    const teacherKey = `${teacher.name} ${teacher.surname}`;

    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }

    setFavorites((prev) =>
      prev.includes(teacherKey)
        ? prev.filter((item) => item !== teacherKey)
        : [...prev, teacherKey],
    );
  };
  return (
    <main className={css.favoritesPageMain}>
      <section className={css.favoritesListSection}>
        <div className={css.favoritesContainer}>
          {isLoading ? (
            <p className={css.noFavoritesMessage}>Loading favorites...</p>
          ) : error ? (
            <p className={css.noFavoritesMessage}>{error}</p>
          ) : favoriteTeachers.length === 0 ? (
            <p className={css.noFavoritesMessage}>
              No favorite teachers found.
            </p>
          ) : (
            favoriteTeachers.map((teacher) => (
              <TeacherCard
                key={`${teacher.name} ${teacher.surname}`}
                teacher={teacher}
                isFavorite={favorites.includes(
                  `${teacher.name} ${teacher.surname}`,
                )}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default FavoritesPage;
