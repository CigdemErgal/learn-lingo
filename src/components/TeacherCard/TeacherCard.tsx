import type { Teacher } from "../../types/teacher";
import css from "./TeacherCard.module.css";

type TeacherCardProps = {
  teacher: Teacher;
};

function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <div className={css.teacherCard}>
      <div className={css.avatarWrapper}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={css.teacherAvatar}
        />
      </div>
      <div className={css.contentWrapper}>
        <h3 className={css.teacherName}>
          {teacher.name} {teacher.surname}
        </h3>

        <p className={css.teacherLanguages}>{teacher.languages.join(", ")}</p>

        <p className={css.teacherRating}>Rating: {teacher.rating}</p>
      </div>
    </div>
  );
}

export default TeacherCard;
