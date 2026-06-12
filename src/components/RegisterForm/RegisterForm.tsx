import css from "./RegisterForm.module.css";
import eyeOffIcon from "../../assets/eye-off-icon.svg";

function RegisterForm() {
  return (
    <form className={css.form}>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        className={css.input}
        required
      />
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
        Sign Up
      </button>
    </form>
  );
}

export default RegisterForm;
