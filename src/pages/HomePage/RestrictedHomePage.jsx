import { Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RestrictedHomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <HomePage /> : <Navigate to="/" />;
};

export default RestrictedHomePage;
