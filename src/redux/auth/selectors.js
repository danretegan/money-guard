const selectUserData = state => state.auth.user;
const selectToken = state => state.auth.token;
const selectIsLoggedIn = state => state.auth.isLoggedIn;
const selectIsLoading = state => state.auth.isLoading;
const selectError = state => state.auth.error;
const selectBalance = state => state.auth.user.balance;

export {
  selectToken,
  selectIsLoggedIn,
  selectUserData,
  selectIsLoading,
  selectError,
  selectBalance,
};
