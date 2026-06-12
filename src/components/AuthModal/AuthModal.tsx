import Modal from "../Modal/Modal";
import css from "./AuthModal.module.css";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

type AuthModalProps = {
  modalType: "login" | "register" | null;
  onClose: () => void;
};

function AuthModal({ modalType, onClose }: AuthModalProps) {
  if (!modalType) return null;
  const title = modalType === "login" ? "Log In" : "Registration";
  const description =
    modalType === "login"
      ? "Welcome back! Please enter your credentials to access your account and continue your search for a teacher."
      : "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.";

  return (
    <Modal onClose={onClose}>
      <div className={css.content}>
        <h2 className={css.title}>{title}</h2>
        <p className={css.description}>{description}</p>

        {modalType === "login" ? <LoginForm /> : null}
        {modalType === "register" ? <RegisterForm /> : null}
      </div>
    </Modal>
  );
}

export default AuthModal;
