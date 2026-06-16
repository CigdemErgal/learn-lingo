import jsonData from "../../../teachers.json";
import type { Teacher } from "../../types/teacher";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./FavoritesPage.module.css";

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
  const favoriteTeachers: Teacher[] = jsonData.filter((teacher) =>
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
          {favoriteTeachers.length === 0 ? (
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
                onToggleFavorite={() => handleToggleFavorite(teacher)}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default FavoritesPage;
