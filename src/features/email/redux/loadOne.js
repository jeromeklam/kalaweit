import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, buildModel } from 'freejsonapi';
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
        // Use rejectHandler as the second argument so that render errors won't be caught.
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

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
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
      };

    case EMAIL_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      item = buildModel(object, 'FreeFW_Email', action.id, { eager: true });
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: item,
        loadOneError: null,
      };

    case EMAIL_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneError: action.data.error,
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
