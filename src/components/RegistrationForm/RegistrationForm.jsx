import styles from "./RegistrationForm.module.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/common/Logo/Logo";
import FormButton from "../../components/common/FormButton/FormButton";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

import icons from "../../images/icons/sprite.svg";
import { useState } from "react";
import PasswordStrength from "../../components/PasswordStrength/PasswordStrength";

const RegistrationForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required*"),
    email: Yup.string().email("Invalid email address").required("Required*"),
    password: Yup.string()
      .min(6, "Must be 6-12 characters")
      .max(12, "Must be 6-12 characters")
      .required("Required*"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required*"),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    setSubmitting(true);

    dispatch(
      register({
        username: values.name,
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        // navigate('/dashboard');
      })
      .catch((error) => {
        setStatus({ success: false, error: error });
        setSubmitting(false);
      });
  };
  return (
    <div className={styles.registerForm}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Logo variant={"formLogo"} />

            <div className={styles.inputField}>
              <svg className={styles.inputIcon}>
                <use href={`${icons}#icon-username`}></use>
              </svg>

              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div className={styles.inputField}>
              <svg className={styles.inputIcon}>
                <use href={`${icons}#icon-email`}></use>
              </svg>

              <Field type="email" name="email" placeholder="E-mail" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className={styles.inputField}>
              <svg className={styles.inputIcon}>
                <use href={`${icons}#icon-password`}></use>
              </svg>

              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onKeyUp={(e) => setPassword(e.target.value)}
              />
              {password.length > 0 && <PasswordStrength password={password} />}
              <ErrorMessage name="password" component="div" />

              {password.length > 0 && (
                <span
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              )}
            </div>

            <div className={styles.inputField}>
              <svg className={styles.inputIcon}>
                <use href={`${icons}#icon-password`}></use>
              </svg>

              <Field
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                onKeyUp={(e) => setConfirmPassword(e.target.value)}
              />
              <ErrorMessage name="confirmPassword" component="div" />

              {confirmPassword.length > 0 && (
                <span
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </span>
              )}
            </div>

            <div className={styles.buttonsWrapper}>
              <FormButton
                type={"submit"}
                text={"register"}
                variant={"multiColorButtton"}
                isDisabled={isSubmitting}
              />
              <FormButton
                type={"button"}
                text={"Log in"}
                variant={"whiteButtton"}
                handlerFunction={() => navigate("/")}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
