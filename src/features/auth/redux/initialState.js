const initialState = {
  authenticated: false,
  user: false,
  token: false,
  checkIsAuthenticatedPending: false,
  checkIsAuthenticatedError: null,
  signInPending: false,
  signInError: null,
  signOutPending: false,
  signOutError: null
};

export default initialState;
