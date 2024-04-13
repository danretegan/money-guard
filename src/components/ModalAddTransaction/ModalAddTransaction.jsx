import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./ModalAddTransaction.module.css";
import AddTransactionForm from "../../components/AddTransactionForm/AddTransactionForm";

const ModalAddTransaction = ({ closeModal }) => {
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
    event.target === event.currentTarget && closeModal();
  };

  return (
    <>
      <div
        ref={modalRef}
        className={styles.addModal}
        onClick={closeOnClickOutside}
      >
        <div className={styles.modalBg}>
          <AddTransactionForm closeModal={closeModal} />
        </div>
      </div>
    </>
  );
};

ModalAddTransaction.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalAddTransaction;
