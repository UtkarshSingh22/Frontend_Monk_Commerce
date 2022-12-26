import { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "../../styles/Modal.module.css";

const Backdrop = ({ onCloseModal }) => {
    return <div className={styles.backdrop} onClick={onCloseModal}></div>;
};

const Overlay = ({ children, className }) => {
    return <div className={`${styles.modal} ${className}`}>{children}</div>;
};

const Modal = ({ children, onCloseModal, className }) => {
    const element = document.querySelector("#modal");

    return (
        <Fragment>
            {ReactDOM.createPortal(<Overlay className={className}>{children}</Overlay>, element)}
            {ReactDOM.createPortal(
                <Backdrop onCloseModal={onCloseModal} />,
                element
            )}
        </Fragment>
    );
};

export default Modal;
