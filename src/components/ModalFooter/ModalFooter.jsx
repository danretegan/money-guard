import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./ModalFooter.module.css";
import { useMediaQuery } from "react-responsive";
import Logo from "../../components/common/Logo/Logo";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import FormButton from "../../components/common/FormButton/FormButton";
import "animate.css";

import MariusBirsanImage from "../../../src/images/members-pictures/marius_birsan.webp";
import DanReteganImage from "../../../src/images/members-pictures/dan_retegan.webp";
import RaresDraganImage from "../../../src/images/members-pictures/rares_dragan.webp";
import CristinaLaesImage from "../../../src/images/members-pictures/cristina_laes.webp";
import RobertUtaImage from "../../../src/images/members-pictures/robert_uta.webp";
import LidiaMolodiucImage from "../../../src/images/members-pictures/lidia_molodiuc.webp";

import MariusBirsanImageRetina from "../../../src/images/members-pictures/marius_birsan@2x.webp";
import DanReteganImageRetina from "../../../src/images/members-pictures/dan_retegan@2x.webp";
import RaresDraganImageRetina from "../../../src/images/members-pictures/rares_dragan@2x.webp";
import CristinaLaesImageRetina from "../../../src/images/members-pictures/cristina_laes@2x.webp";
import RobertUtaImageRetina from "../../../src/images/members-pictures/robert_uta@2x.webp";
import LidiaMolodiucImageRetina from "../../../src/images/members-pictures/lidia_molodiuc@2x.webp";

const isRetina = window.matchMedia(
  "only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)"
).matches;

const imageUrlMariusBirsan = isRetina
  ? MariusBirsanImageRetina
  : MariusBirsanImage;
const imageUrlDanRetegan = isRetina ? DanReteganImageRetina : DanReteganImage;
const imageUrlRaresDragan = isRetina
  ? RaresDraganImageRetina
  : RaresDraganImage;
const imageUrlCristinaLaes = isRetina
  ? CristinaLaesImageRetina
  : CristinaLaesImage;
const imageUrlRobertUta = isRetina ? RobertUtaImageRetina : RobertUtaImage;
const imageUrlLidiaMolodiuc = isRetina
  ? LidiaMolodiucImageRetina
  : LidiaMolodiucImage;

const ModalFooter = ({ closeModal }) => {
  const modalRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";

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

  const animation = "animate__animated animate__fadeInDown  animate__slow";

  return (
    <div
      className={styles.modalFooter}
      onClick={closeOnClickOutside}
      ref={modalRef}
    >
      <div className={styles.modalBg}>
        <div className={styles.modalContent}>
          {screenCondition && <Logo variant={"formLogo"} />}

          <h2>Budget Busters are:</h2>

          <div className={styles.footerCards}>
            {/* 1) Marius Birsan */}
            <div
              className={`${styles.footerTeamCard} ${animation} ${styles.marius}`}
            >
              <img
                src={imageUrlMariusBirsan}
                alt="Marius Birsan"
                className={styles.teamMemberImage}
              />
              <span className={styles.footerTeamName}>Marius Birsan</span>
              <em className={styles.footerTeamFunction}>Team leader</em>
              {/* Iconuri sociale */}
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/MariusBirsan"
                  className={styles.footerGithubIcon}
                  aria-label="GitHub profile of Marius Birsan"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/marius-birsan-6812315b/"
                  className={styles.footerLinkedinIcon}
                  aria-label="LinkedIn profile of Marius Birsan"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* 2) Dan Retegan */}
            <div
              className={`${styles.footerTeamCard} ${animation} ${styles.dan}	`}
            >
              <img
                src={imageUrlDanRetegan}
                alt="Dan Retegan"
                className={styles.teamMemberImage}
              />
              <span className={styles.footerTeamName}>Dan Retegan</span>

              <em className={styles.footerTeamFunction}>Scrum Master</em>
              {/* Iconuri sociale */}
              <div>
                <a
                  href="https://github.com/danretegan"
                  className={styles.footerGithubIcon}
                  aria-label="GitHub profile of Dan Retegan"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/danretegan/"
                  className={styles.footerLinkedinIcon}
                  aria-label="LinkedIn profile of Dan Retegan"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* 3) Rares Dragan */}
            <div
              className={`${styles.footerTeamCard} ${animation} ${styles.rares}`}
            >
              <img
                src={imageUrlRaresDragan}
                alt="Rares Dragan"
                className={styles.teamMemberImage}
              />
              <span className={styles.footerTeamName}>Rares Dragan</span>
              <em className={styles.footerTeamFunction}>Frontend developer</em>
              {/* Iconuri sociale */}
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/RaresDrg"
                  className={styles.footerGithubIcon}
                  aria-label="GitHub profile of Rares Dragan"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/rares-dragan/"
                  className={styles.footerLinkedinIcon}
                  aria-label="LinkedIn profile of Rares Dragan"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* 4) Cristina Laes */}
            <div
              className={`${styles.footerTeamCard} ${animation} ${styles.cristina}`}
            >
              <img
                src={imageUrlCristinaLaes}
                alt="Cristina Laes"
                className={styles.teamMemberImage}
              />
              <span className={styles.footerTeamName}>Cristina Laes</span>

              <em className={styles.footerTeamFunction}>Frontend developer</em>
              {/* Iconuri sociale */}
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/Cris8791"
                  className={styles.footerGithubIcon}
                  aria-label="GitHub profile of Cristina Laes"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/laes-cristina-a44b651b5/"
                  className={styles.footerLinkedinIcon}
                  aria-label="LinkedIn profile of Cristina Laes"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* 5) Robert Uță */}
            <div
              className={`${styles.footerTeamCard} ${animation} ${styles.robert}`}
            >
              <img
                src={imageUrlRobertUta}
                alt="Robert Uță"
                className={styles.teamMemberImage}
              />
              <span className={styles.footerTeamName}>Robert Uță</span>

              <em className={styles.footerTeamFunction}>Frontend developer</em>
              {/* Iconuri sociale */}
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/RobertUta"
                  className={styles.footerGithubIcon}
                  aria-label="GitHub profile of Robert Uță"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/uta-robert-constantin/"
                  className={styles.footerLinkedinIcon}
                  aria-label="LinkedIn profile of Robert Uță"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* 6) Lidia Molodiuc */}
            <div
              className={`${styles.footerTeamCard} ${animation} ${styles.lidia}`}
            >
              <img
                src={imageUrlLidiaMolodiuc}
                alt="Lidia Molodiuc"
                className={styles.teamMemberImage}
              />
              <span className={styles.footerTeamName}>Lidia Molodiuc</span>

              <em className={styles.footerTeamFunction}>Frontend developer</em>
              {/* Iconuri sociale */}
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/demouserlidia88"
                  className={styles.footerGithubIcon}
                  aria-label="GitHub profile of Lidia Molodiuc"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaGithub />
                </a>
                <a
                  href="_"
                  className={styles.footerLinkedinIcon}
                  aria-label="LinkedIn profile of Lidia Molodiuc"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
          <FormButton
            type={"button"}
            text={"Thank You"}
            variant={"whiteButtton"}
            handlerFunction={() => closeModal()}
          />
        </div>
      </div>
    </div>
  );
};

ModalFooter.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalFooter;
