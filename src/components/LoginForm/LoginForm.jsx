import styles from "./LoginForm.module.css";
import Logo from "../../components/common/Logo/Logo";
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/common/FormButton/FormButton";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

import icons from "../../images/icons/sprite.svg";
import { useState } from "react";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required*"),
    password: Yup.string()
      .min(6, "Must be 6-12 characters")
      .max(12, "Must be 6-12 characters")
      .required("Required*"),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    setSubmitting(true);

    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        // console.log('chestia din then: => login');
      })
      .catch((error) => {
        setStatus({ success: false, error: error });
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.loginForm}>
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

            <div className={styles.buttonsWrapper}>
              <FormButton
                type={"submit"}
                text={"Log in"}
                variant={"multiColorButtton"}
                isDisabled={isSubmitting}
              />
              <FormButton
                type={"button"}
                text={"register"}
                variant={"whiteButtton"}
                handlerFunction={() => navigate("/register")}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
