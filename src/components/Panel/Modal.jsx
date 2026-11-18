import { useEffect } from "react";
import styles from "./styles/Modal.module.css";

const Modal = ({ isOpen, type = "success", title, message, onClose }) => {
    // Cerrar con Escape
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={`${styles.modal} ${styles[type]}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="modal-title" className={styles.title}>{title}</h2>
                <p className={styles.message}>{message}</p>
                <button className={styles.button} onClick={onClose} autoFocus>
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default Modal;