import { Navigate } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RestrictedRegisterPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterPage />;
};

export default RestrictedRegisterPage;
