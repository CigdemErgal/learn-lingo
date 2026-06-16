import Modal from "../Modal/Modal";
import type { Teacher } from "../../types/teacher";
import css from "./TrialLessonModal.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { trialLessonSchema } from "../../utils/validationSchemas";

type TrialLessonModalProps = {
  teacher: Teacher;
  onClose: () => void;
};

type TrialLessonFormData = {
  reason: string;
  fullName: string;
  email: string;
  phone: string;
};

function TrialLessonModal({ teacher, onClose }: TrialLessonModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrialLessonFormData>({
    resolver: yupResolver(trialLessonSchema),
  });

  const onSubmit = (data: TrialLessonFormData) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <form className={css.content} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.title}>Book trial lesson</h2>
        <p className={css.description}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={css.teacherInfo}>
          <img
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            className={css.teacherAvatar}
          />
          <div className={css.teacherText}>
            <p className={css.teacherLabel}>Your teacher</p>
            <p className={css.teacherName}>
              {teacher.name} {teacher.surname}
            </p>
          </div>
        </div>
        <h3 className={css.question}>
          What is your main reason for learning English?
        </h3>

        <div className={css.reasonOptions}>
          <label className={css.reasonOption}>
            <input
              type="radio"
              value="Career and business"
              {...register("reason")}
            />
            <span>Career and business</span>
          </label>

          <label className={css.reasonOption}>
            <input
              type="radio"
              value="Lesson for kids"
              {...register("reason")}
            />
            <span>Lesson for kids</span>
          </label>

          <label className={css.reasonOption}>
            <input type="radio" value="Living abroad" {...register("reason")} />
            <span>Living abroad</span>
          </label>

          <label className={css.reasonOption}>
            <input
              type="radio"
              value="Exams and coursework"
              {...register("reason")}
            />
            <span>Exams and coursework</span>
          </label>

          <label className={css.reasonOption}>
            <input
              type="radio"
              value="Culture, travel or hobby"
              {...register("reason")}
            />
            <span>Culture, travel or hobby</span>
          </label>
        </div>
        {errors.reason && <p className={css.error}>{errors.reason.message}</p>}
        <div className={css.formFields}>
          <input
            type="text"
            placeholder="Full Name"
            className={css.input}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className={css.error}>{errors.fullName.message}</p>
          )}
          <input
            type="email"
            placeholder="Email"
            className={css.input}
            {...register("email")}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
          <input
            type="tel"
            placeholder="Phone number"
            className={css.input}
            {...register("phone")}
          />
          {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
        </div>

        <button type="submit" className={css.submitButton}>
          Book
        </button>
      </form>
    </Modal>
  );
}

export default TrialLessonModal;
