import {
  AUTH_CHECK_IS_AUTHENTICATED_BEGIN,
  AUTH_CHECK_IS_AUTHENTICATED_SUCCESS,
  AUTH_CHECK_IS_AUTHENTICATED_FAILURE,
  AUTH_CHECK_IS_AUTHENTICATED_DISMISS_ERROR,
} from './constants';
import { jsonApiNormalizer, normalizedObjectModeler } from 'freejsonapi';
import { initAxios, freeAssoApi } from '../../../common';
import cookie from 'react-cookies';
import { schema, defaultConfig } from '../';
import { saveToLS, getFromLS } from '../../ui';
import Ajv from 'ajv';

export function checkIsAuthenticated(args = {}) {
  return dispatch => {
    dispatch({
      type: AUTH_CHECK_IS_AUTHENTICATED_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const autologin = cookie.load('AutoLogin');
      let headers = {};
      if (autologin) {
        headers = {
          headers: { AutoLogin: autologin },
        };
      }
      const doRequest = freeAssoApi.post('/v1/sso/check', {}, headers);
      doRequest.then(
        res => {
          dispatch({
            type: AUTH_CHECK_IS_AUTHENTICATED_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: AUTH_CHECK_IS_AUTHENTICATED_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissCheckIsAuthenticatedError() {
  return {
    type: AUTH_CHECK_IS_AUTHENTICATED_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_CHECK_IS_AUTHENTICATED_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        checkIsAuthenticatedPending: true,
        checkIsAuthenticatedError: null,
      };

    case AUTH_CHECK_IS_AUTHENTICATED_SUCCESS:
      // The request is success
      const datas = action.data;
      let user = false;
      let token = false;
      let authenticated = false;
      let more = {};
      let realm = null;
      let inputMoney = state.inputMoney;
      let displayMoney = state.displayMoney;
      if (datas) {
        if (datas.headers && datas.headers.authorization) {
          token = datas.headers.authorization;
        }
        if (datas.headers && datas.headers['app-id']) {
          cookie.save('APP_ID', datas.headers['app-id'], { path: '/' });
        }
        if (datas.headers && datas.headers['sso-id']) {
          cookie.save('SSO_ID', datas.headers['sso-id'], { path: '/' });
        }
        if (datas.data) {
          let object = jsonApiNormalizer(datas.data);
          if (object) {
            user = normalizedObjectModeler(object, 'FreeSSO_User', object.SORTEDELEMS[0], { eager: true });
          }
        }
        if (token && user) {
          authenticated = true;
          cookie.save('Authorization', token, { path: '/' });
          initAxios(token);
          if (user.config && user.config.ubrk_config) {
            more.settings = JSON.parse(user.config.ubrk_config) || defaultConfig;
          } else {
            more.settings = defaultConfig;
          }
          if (user.config && user.config.ubrk_cache) {
            more.cache = JSON.parse(user.config.ubrk_cache) || {};
            saveToLS('layouts', more.cache);
          } else {
            more.cache = {};
          }
          let defaultRealm = getFromLS('realm', 'freeasso-realm');
          if (user.realms && Array.isArray(user.realms)) {
            const found = user.realms.find(item => { return item.id === defaultRealm } );
            if (found) {
              realm = found;
            } else {
              user.realms.forEach(item => {realm = item;});
            }
            inputMoney = realm.grp_money_input;
            displayMoney = realm.grp_money_code;
          }
          const ajv = new Ajv({ allErrors: true, verbose: true, useDefaults: true });
          const validate = ajv.compile(schema);
          validate(more.settings);
        }
      }
      return {
        ...state,
        ...more,
        token: token,
        user: user,
        realm: realm,
        authenticated: authenticated,
        authFirstChecked: true,
        checkIsAuthenticatedPending: false,
        checkIsAuthenticatedError: null,
        inputMoney: inputMoney,
        displayMoney: displayMoney,
      };

    case AUTH_CHECK_IS_AUTHENTICATED_FAILURE:
      // The request is failed
      return {
        ...state,
        authFirstChecked: true,
        checkIsAuthenticatedPending: false,
        checkIsAuthenticatedError: action.data.error || null,
      };

    case AUTH_CHECK_IS_AUTHENTICATED_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        authFirstChecked: true,
        checkIsAuthenticatedError: null,
      };

    default:
      return state;
  }
}
