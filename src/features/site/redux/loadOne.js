import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, buildModel } from 'freejsonapi';
import {
  SITE_LOAD_ONE_BEGIN,
  SITE_LOAD_ONE_SUCCESS,
  SITE_LOAD_ONE_FAILURE,
  SITE_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return dispatch => {

    dispatch({
      type: SITE_LOAD_ONE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/site/' + args);
      doRequest.then(
        res => {
          dispatch({
            type: SITE_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: SITE_LOAD_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadOneError() {
  return {
    type: SITE_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
        createOneError: null,
        updateOneError: null,
      };

    case SITE_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let raw  = null;
      let object = jsonApiNormalizer(action.data.data);
      raw  = buildModel(object, 'FreeAsso_Site', action.id);
      item = buildModel(object, 'FreeAsso_Site', action.id, {eager: true});
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: item,
        loadOneRaw: raw,
        loadOneError: null,
      };

    case SITE_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: null,
        loadOneRaw: null,
        loadOneError: action.data.error,
      };

    case SITE_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
