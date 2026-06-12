import css from "./RegisterForm.module.css";
import eyeOffIcon from "../../assets/eye-off-icon.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validationSchemas";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="name"
        placeholder="Name"
        className={css.input}
        {...register("name")}
      />
      {errors.name && <p className={css.error}>{errors.name.message}</p>}
      <input
        type="email"
        id="email"
        placeholder="Email"
        className={css.input}
        {...register("email")}
      />
      {errors.email && <p className={css.error}>{errors.email.message}</p>}
      <div className={css.passwordWrapper}>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className={css.input}
          {...register("password")}
        />
        <img
          src={eyeOffIcon}
          alt="Toggle password visibility"
          className={css.passwordIcon}
        />
      </div>
      {errors.password && (
        <p className={css.error}>{errors.password.message}</p>
      )}
      <button type="submit" className={css.button}>
        Sign Up
      </button>
    </form>
  );
}

export default RegisterForm;
