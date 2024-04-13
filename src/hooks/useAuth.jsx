import { useSelector } from 'react-redux';
import {
  selectUserData,
  selectToken,
  selectIsLoggedIn,
  selectIsLoading,
  selectError,
} from '../redux/auth/selectors';

export const useAuth = () => {
  const user = useSelector(selectUserData);
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return {
    user,
    token,
    isLoggedIn,
    isLoading,
    error,
  };
};
