import styles from "./LogOutModal.module.css";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";

import FormButton from "../../components/common/FormButton/FormButton";
import Logo from "../../components/common/Logo/Logo";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";

const LogOutModal = ({ closeModal }) => {
  const dispatch = useDispatch();

  const modalRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // setTimeout(() => {
    //   modalRef.current.classList.add(styles.isOpen);
    // }, 0);

    const addCloseEvent = (event) => {
      event.key === "Escape" && closeModal();
    };
    document.addEventListener("keydown", addCloseEvent);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", addCloseEvent);
    };
  });

  const closeOnClickOutside = (event) => {
    event.currentTarget === event.target && closeModal();
  };

  const screenCondition = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div
      className={styles.logOutModal}
      onClick={closeOnClickOutside}
      ref={modalRef}
    >
      <div className={styles.modalBg}>
        <div className={styles.modalContent}>
          {screenCondition && <Logo variant={"formLogo"} />}

          <p>Are you sure you want to log out?</p>

          <div className={styles.buttonsWrapper}>
            <FormButton
              type={"button"}
              text={"Logout"}
              variant={"multiColorButtton"}
              handlerFunction={() => dispatch(logOut())}
            />
            <FormButton
              type={"button"}
              text={"cancel"}
              variant={"whiteButtton"}
              handlerFunction={() => closeModal()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

LogOutModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default LogOutModal;
