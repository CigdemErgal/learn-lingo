import css from "./RegisterForm.module.css";
import eyeOffIcon from "../../assets/eye-off-icon.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validationSchemas";
import { registerUser } from "../../firebase/auth";
import { useState } from "react";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

type RegisterFormProps = {
  onClose: () => void;
};

function RegisterForm({ onClose }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const onSubmit = async (data: RegisterFormData) => {
    setAuthError("");
    try {
      await registerUser(data.name, data.email, data.password);
      onClose();
    } catch {
      setAuthError("This email is already in use.");
    }
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
        Sign Up
      </button>
    </form>
  );
}

export default RegisterForm;
