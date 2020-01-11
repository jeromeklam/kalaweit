import { freeAssoApi } from '../../../common';
import {
  DONATION_DEL_ONE_BEGIN,
  DONATION_DEL_ONE_SUCCESS,
  DONATION_DEL_ONE_FAILURE,
  DONATION_DEL_ONE_DISMISS_ERROR,
} from './constants';

export function delOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: DONATION_DEL_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const id = args;
      const doRequest = freeAssoApi.delete('/v1/asso/donation/' + id);
      doRequest.then(
        (res) => {
          dispatch({
            type: DONATION_DEL_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: DONATION_DEL_ONE_FAILURE,
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
export function dismissDelOneError() {
  return {
    type: DONATION_DEL_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DONATION_DEL_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        delOnePending: true,
        delOneError: null,
      };

    case DONATION_DEL_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        delOnePending: false,
        delOneError: null,
      };

    case DONATION_DEL_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        delOnePending: false,
        delOneError: action.data.error,
      };

    case DONATION_DEL_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        delOneError: null,
      };

    default:
      return state;
  }
}
