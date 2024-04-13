import { Navigate } from 'react-router-dom';
import CurrencyPage from './CurrencyPage';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RestrictedCurrencyPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <CurrencyPage /> : <Navigate to="/" />;
};

export default RestrictedCurrencyPage;
