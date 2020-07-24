import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, normalizedObjectModeler } from 'freejsonapi';
import {
  EMAIL_LOAD_ONE_BEGIN,
  EMAIL_LOAD_ONE_SUCCESS,
  EMAIL_LOAD_ONE_FAILURE,
  EMAIL_LOAD_ONE_DISMISS_ERROR,
} from './constants';


export function loadOne(args = {}) {
  return dispatch => {
    dispatch({
      type: EMAIL_LOAD_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/core/email/' + args);
      doRequest.then(
        res => {
          dispatch({
            type: EMAIL_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: EMAIL_LOAD_ONE_FAILURE,
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
    type: EMAIL_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EMAIL_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
        createOneError: null,
        updateOneError: null,
      };

    case EMAIL_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      item = normalizedObjectModeler(object, 'FreeFW_Email', action.id, { eager: true });
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: item,
        loadOneError: null,
      };

    case EMAIL_LOAD_ONE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        loadOnePending: false,
        loadOneError: error,
      };

    case EMAIL_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
