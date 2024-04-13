import styles from "./RegisterPage.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/auth/selectors";
import RegisterForm from "../../components/RegistrationForm/RegistrationForm";
import LoadingScreen from "../../components/common/LoadingScreen/LoadingScreen";

const RegisterPage = () => {
  const isLoading = useSelector(selectIsLoading);

  const [forcedLoading, setForcedLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setForcedLoading(false), 2000);
  }, [forcedLoading]);

  if (forcedLoading) {
    return <LoadingScreen text={"Loading page..."} />;
  }

  if (isLoading) {
    return <LoadingScreen text={"Loading ..."} />;
  }

  return (
    <div className={styles.registerPage}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
