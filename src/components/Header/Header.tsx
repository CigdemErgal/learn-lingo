import { NavLink } from "react-router-dom";
import loginIcon from "../../assets/login-icon.svg";
import css from "./Header.module.css";
import type { User } from "firebase/auth";

type HeaderProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  user: User | null;
  isLoading: boolean;
  onLogoutClick: () => void;
};
function Header({
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  user,
  isLoading,
}: HeaderProps) {
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${css.navLink} ${css.navLinkActive}` : css.navLink;

  return (
    <header className={css.header}>
      <div className={css.container}>
        <NavLink to="/" className={css.logo}>
          <span className={css.logoMark}></span>
          <span className={css.logoText}>LearnLingo</span>
        </NavLink>

        <nav className={css.nav}>
          <NavLink to="/" className={getNavClass}>
            Home
          </NavLink>
          <NavLink to="/teachers" className={getNavClass}>
            Teachers
          </NavLink>
          <NavLink to="/favorites" className={getNavClass}>
            Favorites
          </NavLink>
        </nav>

        <div className={css.actions}>
          {isLoading ? null : user ? (
            <button
              type="button"
              className={css.logoutButton}
              onClick={onLogoutClick}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                type="button"
                className={css.loginButton}
                onClick={onLoginClick}
              >
                <img
                  src={loginIcon}
                  alt="Login-icon"
                  className={css.loginIcon}
                />
                Login
              </button>
              <button
                type="button"
                className={css.registrationButton}
                onClick={onRegisterClick}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
