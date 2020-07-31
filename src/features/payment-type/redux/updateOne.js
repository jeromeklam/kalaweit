import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, normalizedObjectUpdate } from 'freejsonapi';
import {
  PAYMENT_TYPE_UPDATE_ONE_UPDATE,
  PAYMENT_TYPE_UPDATE_ONE_BEGIN,
  PAYMENT_TYPE_UPDATE_ONE_SUCCESS,
  PAYMENT_TYPE_UPDATE_ONE_FAILURE,
  PAYMENT_TYPE_UPDATE_ONE_DISMISS_ERROR,
} from './constants';

export function updateOne(id, args = {}) {
  return (dispatch) => {
    dispatch({
      type: PAYMENT_TYPE_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.put('/v1/asso/payment_type/' + id, args);
      doRequest.then(
        (res) => {
          dispatch({
            type: PAYMENT_TYPE_UPDATE_ONE_SUCCESS,
            data: res,
            id: id,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: PAYMENT_TYPE_UPDATE_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateOneError() {
  return {
    type: PAYMENT_TYPE_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PAYMENT_TYPE_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case PAYMENT_TYPE_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case PAYMENT_TYPE_UPDATE_ONE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        updateOnePending: false,
        updateOneError: error,
      };

    case PAYMENT_TYPE_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    case PAYMENT_TYPE_UPDATE_ONE_UPDATE:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = normalizedObjectUpdate(myItems, 'FreeAsso_PaymentType', object);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
