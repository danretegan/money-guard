import styles from "./LoginPage.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/auth/selectors";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoadingScreen from "../../components/common/LoadingScreen/LoadingScreen";

const LoginPage = () => {
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
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
