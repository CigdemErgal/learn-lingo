import css from "./LoginForm.module.css";
import eyeOffIcon from "../../assets/eye-off-icon.svg";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../utils/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";

type LoginFormData = {
  email: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
