import type { ReactNode } from "react";
import { useEffect } from "react";
import css from "./Modal.module.css";
import closeIcon from "../../assets/close-icon.svg";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={css.closeButton} onClick={onClose}>
          <img src={closeIcon} alt="Close modal" className={css.closeIcon} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
