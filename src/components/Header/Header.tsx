import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <NavLink to="/" className={css.logo}>
          <span className={css.logoMark}></span>
          <span>Learn Lingo</span>
        </NavLink>

        <nav className={css.nav}>
          <NavLink to="/" className={css.link}>
            Home
          </NavLink>
          <NavLink to="/about" className={css.link}>
            Teachers
          </NavLink>
          <NavLink to="/contact" className={css.link}>
            Favorites
          </NavLink>
        </nav>
        <div className={css.actions}>
          <button type="button" className={css.button}>
            Login
          </button>
          <button type="button" className={css.buttonAccent}>
            Registration
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
