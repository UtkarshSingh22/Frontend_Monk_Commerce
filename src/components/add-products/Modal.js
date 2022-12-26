import { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "../../styles/Modal.module.css";

const Backdrop = ({ onCloseModal }) => {
    return <div className={styles.backdrop} onClick={onCloseModal}></div>;
};

const Overlay = ({ children }) => {
    return <div className={styles.modal}>{children}</div>;
};

const Modal = ({ children, onCloseModal }) => {
    const element = document.querySelector("#modal");

    return (
        <Fragment>
            {ReactDOM.createPortal(<Overlay>{children}</Overlay>, element)}
            {ReactDOM.createPortal(
                <Backdrop onCloseModal={onCloseModal} />,
                element
            )}
        </Fragment>
    );
};

export default Modal;
