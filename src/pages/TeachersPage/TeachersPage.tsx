import css from "./TeachersPage.module.css";
import jsonData from "../../../teachers.json";
import type { Teacher } from "../../types/teacher";
import { useState } from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Filters from "../../components/Filters/Filters";

interface TeachersPageProps {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

function TeachersPage({ favorites, setFavorites }: TeachersPageProps) {
  const teachers: Teacher[] = jsonData;
  const [visibleTeachers, setVisibleTeachers] = useState(4);
  const [selectedPrice, setSelectedPrice] = useState("30");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.price_per_hour <= Number(selectedPrice) &&
      (selectedLanguage === "All" ||
        teacher.languages.includes(selectedLanguage)) &&
      (selectedLevel === "All" || teacher.levels.includes(selectedLevel)),
  );
  const handleToggleFavorite = (teacher: Teacher) => {
    const teacherKey = `${teacher.name} ${teacher.surname}`;

    setFavorites((prev) =>
      prev.includes(teacherKey)
        ? prev.filter((item) => item !== teacherKey)
        : [...prev, teacherKey],
    );
  };
  console.log(filteredTeachers);
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
          {filteredTeachers.length === 0 ? (
            <p className={css.noTeachersMessage}>No teachers found.</p>
          ) : (
            filteredTeachers
              .slice(0, visibleTeachers)
              .map((teacher) => (
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

      {visibleTeachers < filteredTeachers.length && (
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
