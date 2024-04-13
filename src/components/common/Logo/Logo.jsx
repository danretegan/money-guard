import styles from "./Logo.module.css";
import icons from "../../../images/icons/sprite.svg";
import PropTypes from "prop-types";

// todo: href-ul de la a

const Logo = ({ variant }) => {
  return (
    <a className={`${styles.logo} ${styles[variant]}`} href={"/money-guard/"}>
      <svg>
        <use href={`${icons}#icon-logo`}></use>
      </svg>
      <span>Money Guard</span>
    </a>
  );
};

Logo.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default Logo;
