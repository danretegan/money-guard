import PropTypes from "prop-types";
import zxcvbn from "zxcvbn";
import styles from "./PasswordStrength.module.css";

const PasswordStrength = ({ password }) => {
  const testedResult = zxcvbn(password);

  const calcPasswordStrength = (score) => {
    switch (score) {
      case 0:
        return "bad";
      case 1:
        return "bad";
      case 2:
        return "medium";
      case 3:
        return "good";
      case 4:
        return "strong";
      default:
        return "bad";
    }
  };

  return (
    <>
      <progress
        value={testedResult.score}
        max="4"
        className={`${styles.progressBar} ${
          styles[calcPasswordStrength(testedResult.score)]
        }`}
      ></progress>
    </>
  );
};

PasswordStrength.propTypes = {
  password: PropTypes.string.isRequired,
};

export default PasswordStrength;
