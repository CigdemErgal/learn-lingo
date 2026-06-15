import css from "./TeachersPage.module.css";
import jsonData from "../../../teachers.json";
import type { Teacher } from "../../types/teacher";
import { useState } from "react";

function TeachersPage() {
  const teachers: Teacher[] = jsonData;

  const [visibleTeachers, setVisibleTeachers] = useState(4);

  const handleLoadMore = () => {
    setVisibleTeachers((prev) => prev + 4);
  };

  return (
    <main className={css.teachersPageMain}>
      <section className={css.teachersPageFilterSection}>
        <div className={css.filterContainer}>
          <h2 className={css.filterTitle}>Filter</h2>
        </div>
      </section>

      <section className={css.teacherListSection}>
        <div className={css.teachersContainer}>
          <h2 className={css.teachersTitle}>Teachers</h2>
          {teachers.slice(0, visibleTeachers).map((teacher) => (
            <div
              key={teacher.name + teacher.surname}
              className={css.teacherCard}
            >
              <img
                src={teacher.avatar_url}
                alt={`${teacher.name} ${teacher.surname}`}
                className={css.teacherAvatar}
              />
              <h3
                className={css.teacherName}
              >{`${teacher.name} ${teacher.surname}`}</h3>
              <p className={css.teacherLanguages}>
                {teacher.languages.join(", ")}
              </p>
              <p className={css.teacherRating}>{`Rating: ${teacher.rating}`}</p>
            </div>
          ))}
        </div>
      </section>
      {visibleTeachers < teachers.length && (
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
