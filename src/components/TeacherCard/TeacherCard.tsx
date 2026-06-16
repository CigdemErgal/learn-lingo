import type { Teacher } from "../../types/teacher";
import css from "./TeacherCard.module.css";
import heartIcon from "../../assets/heart-icon.svg";
import activeIcon from "../../assets/active-icon.svg";
import { useState } from "react";
import yellowHeartIcon from "../../assets/yellow-heart-icon.svg";

type TeacherCardProps = {
  teacher: Teacher;
  onToggleFavorite?: (teacher: Teacher) => void;
  isFavorite: boolean;
};

function TeacherCard({
  teacher,
  isFavorite,
  onToggleFavorite,
}: TeacherCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={css.teacherCard}>
      <div className={css.avatarWrapper}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={css.teacherAvatar}
        />

        <img src={activeIcon} alt="Online" className={css.activeIcon} />
      </div>
      <div className={css.contentWrapper}>
        <div className={css.topRow}>
          <div className={css.titleBlock}>
            <p className={css.teacherLabel}>Languages</p>
            <h3 className={css.teacherName}>
              {teacher.name} {teacher.surname}
            </h3>
          </div>

          <div className={css.metaRow}>
            <p>Lessons online</p>
            <p>Lessons done: {teacher.lessons_done}</p>
            <p>Rating: {teacher.rating}</p>
            <p>
              Price / 1 hour: <span>{teacher.price_per_hour}$</span>
            </p>
          </div>
          <div className={css.rightBlock}>
            <button
              type="button"
              className={css.favoriteButton}
              onClick={() => onToggleFavorite && onToggleFavorite(teacher)}
            >
              <img
                src={isFavorite ? yellowHeartIcon : heartIcon}
                alt="Favorite"
              />
            </button>
          </div>
        </div>

        <p className={css.infoText}>
          <span>Speaks:</span> {teacher.languages.join(", ")}
        </p>

        <p className={css.infoText}>
          <span>Lesson Info:</span> {teacher.lesson_info}
        </p>

        <p className={css.infoText}>
          <span>Conditions:</span> {teacher.conditions.join(" ")}
        </p>
        <button
          type="button"
          className={css.readMoreButton}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
        {isExpanded && (
          <div className={css.expandedContent}>
            <p className={css.experienceText}>{teacher.experience}</p>

            <div className={css.reviewsList}>
              {teacher.reviews.map((review, index) => (
                <div key={index} className={css.reviewItem}>
                  <div className={css.reviewHeader}>
                    <div className={css.reviewAvatar}>
                      {review.reviewer_name.charAt(0).toUpperCase()}
                    </div>

                    <div className={css.reviewMeta}>
                      <p className={css.reviewerName}>{review.reviewer_name}</p>
                      <p className={css.reviewerRating}>
                        ⭐ {review.reviewer_rating}
                      </p>
                    </div>
                  </div>

                  <p className={css.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>

            <button type="button" className={css.trialLessonButton}>
              Book trial lesson
            </button>
          </div>
        )}

        <div className={css.levelsList}>
          {teacher.levels.map((level, index) => (
            <span
              key={index}
              className={index === 0 ? css.activeLevelTag : css.levelTag}
            >
              #{level}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherCard;
