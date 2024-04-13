import { Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RestrictedLoginPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />;
};

export default RestrictedLoginPage;
