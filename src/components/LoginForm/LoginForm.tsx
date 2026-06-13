import css from "./LoginForm.module.css";
import eyeOffIcon from "../../assets/eye-off-icon.svg";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../utils/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../../firebase/auth";
import { useState } from "react";

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onClose: () => void;
};

function LoginForm({ onClose }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const onSubmit = async (data: LoginFormData) => {
    setAuthError("");

    try {
      await loginUser(data.email, data.password);
      onClose();
    } catch {
      setAuthError("Invalid email or password");
    }
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
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Password"
          className={css.input}
          {...register("password")}
        />
        <img
          src={eyeOffIcon}
          alt="Toggle password visibility"
          className={css.passwordIcon}
          onClick={() => setShowPassword((prev) => !prev)}
        />
      </div>
      {errors.password && (
        <p className={css.error}>{errors.password.message}</p>
      )}
      {authError && <p className={css.error}>{authError}</p>}
      <button type="submit" className={css.button}>
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
