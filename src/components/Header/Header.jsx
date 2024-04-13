import styles from "./Header.module.css";
import Logo from "../../components/common/Logo/Logo";
import icons from "../../images/icons/sprite.svg";
import { useState } from "react";
import LogOutModal from "../../components/LogOutModal/LogOutModal";
import { useAuth } from "../../hooks";

const Header = () => {
  const [logOutModalIsOpen, setlogOutModalIsOpen] = useState(false);
  const closeModal = () => {
    setlogOutModalIsOpen(false);
  };

  const { user } = useAuth();

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <Logo variant="navbarLogo" />
          <div className={styles.userMenu}>
            <span className={styles.username}>{user.username}</span>
            <span className={styles.delimiter}></span>
            <button
              className={styles.logOutBtn}
              onClick={() => setlogOutModalIsOpen(true)}
            >
              <svg>
                <use href={`${icons}#icon-exit`}></use>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {logOutModalIsOpen && <LogOutModal closeModal={closeModal} />}
    </>
  );
};

export default Header;
