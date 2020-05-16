import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, buildModel } from 'freejsonapi';
import {
  PAYMENT_TYPE_LOAD_ONE_BEGIN,
  PAYMENT_TYPE_LOAD_ONE_SUCCESS,
  PAYMENT_TYPE_LOAD_ONE_FAILURE,
  PAYMENT_TYPE_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: PAYMENT_TYPE_LOAD_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/payment_type/' + args);
      doRequest.then(
        (res) => {
          dispatch({
            type: PAYMENT_TYPE_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: PAYMENT_TYPE_LOAD_ONE_FAILURE,
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
    type: PAYMENT_TYPE_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PAYMENT_TYPE_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
      };

    case PAYMENT_TYPE_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      item = buildModel(object, 'FreeAsso_PaymentType', action.id, { eager: true });
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: item,
        loadOneError: null,
      };

    case PAYMENT_TYPE_LOAD_ONE_FAILURE:
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

    case PAYMENT_TYPE_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
