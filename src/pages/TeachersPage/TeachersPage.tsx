import css from "./TeachersPage.module.css";
import jsonData from "../../../teachers.json";
import type { Teacher } from "../../types/teacher";
import { useState } from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

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
            <TeacherCard
              key={teacher.name + teacher.surname}
              teacher={teacher}
            />
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
