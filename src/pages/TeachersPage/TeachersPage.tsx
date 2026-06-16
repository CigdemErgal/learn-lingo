import css from "./TeachersPage.module.css";
import type { Teacher } from "../../types/teacher";
import { useEffect, useState } from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Filters from "../../components/Filters/Filters";
import { getTeachers, getTeachersCount } from "../../firebase/teachers";

interface TeachersPageProps {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  onRequireAuth: () => void;
  isAuthenticated: boolean;
}

function TeachersPage({
  favorites,
  setFavorites,
  onRequireAuth,
  isAuthenticated,
}: TeachersPageProps) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [visibleTeachers, setVisibleTeachers] = useState(4);
  const [selectedPrice, setSelectedPrice] = useState("30");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [totalTeachersCount, setTotalTeachersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTeachers() {
      setIsLoading(true);
      setError("");

      try {
        const [loadedTeachers, totalCount] = await Promise.all([
          getTeachers(visibleTeachers),
          getTeachersCount(),
        ]);

        if (!isMounted) {
          return;
        }

        setTeachers(loadedTeachers);
        setTotalTeachersCount(totalCount);
      } catch {
        if (!isMounted) {
          return;
        }

        setError("Unable to load teachers right now.");
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
  }, [visibleTeachers]);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.price_per_hour <= Number(selectedPrice) &&
      (selectedLanguage === "All" ||
        teacher.languages.includes(selectedLanguage)) &&
      (selectedLevel === "All" || teacher.levels.includes(selectedLevel)),
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

  const handleLoadMore = () => {
    setVisibleTeachers((prev) => prev + 4);
  };

  return (
    <main className={css.teachersPageMain}>
      <section className={css.teachersPageFilterSection}>
        <div className={css.filterContainer}>
          <Filters
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />
        </div>
      </section>

      <section className={css.teacherListSection}>
        <div className={css.teachersContainer}>
          {isLoading ? (
            <p className={css.noTeachersMessage}>Loading teachers...</p>
          ) : error ? (
            <p className={css.noTeachersMessage}>{error}</p>
          ) : filteredTeachers.length === 0 ? (
            <p className={css.noTeachersMessage}>No teachers found.</p>
          ) : (
            filteredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.name + teacher.surname}
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

      {!isLoading && !error && visibleTeachers < totalTeachersCount && (
        <button
          type="button"
          className={css.loadMoreButton}
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </main>
  );
}

export default TeachersPage;
