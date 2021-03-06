import { defaultConfig } from '../';

const initialState = {
  loadTimeOut: 500,
  authFirstChecked: false,
  authenticated: false,
  user: false,
  realm: null,
  settings: defaultConfig,
  cache: false,
  token: false,
  checkIsAuthenticatedPending: false,
  checkIsAuthenticatedError: null,
  signInPending: false,
  signInError: null,
  signOutPending: false,
  signOutError: null,
  locale: 'fr',
  inputMoney: 'EUR',
  displayMoney: 'EUR',
  askPasswordPending: false,
  askPasswordError: null,
  changePasswordPending: false,
  changePasswordError: null,
  updateOnePending: false,
  updateOneError: null,
  updatePasswordPending: false,
  updatePasswordError: null,
  updateConfigPending: false,
  updateConfigError: null,
  changeSettingPending: false,
  changeSettingError: null,
};

export default initialState;
