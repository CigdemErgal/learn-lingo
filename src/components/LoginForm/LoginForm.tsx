import css from "./LoginForm.module.css";
import eyeOffIcon from "../../assets/eye-off-icon.svg";

function LoginForm() {
  return (
    <form className={css.form}>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        className={css.input}
        required
      />

      <div className={css.passwordWrapper}>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className={css.input}
          required
        />
        <img
          src={eyeOffIcon}
          alt="Toggle password visibility"
          className={css.passwordIcon}
        />
      </div>
      <button type="submit" className={css.button}>
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
