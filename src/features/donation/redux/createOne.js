import { freeAssoApi } from '../../../common';
import {
  DONATION_CREATE_ONE_BEGIN,
  DONATION_CREATE_ONE_SUCCESS,
  DONATION_CREATE_ONE_FAILURE,
  DONATION_CREATE_ONE_DISMISS_ERROR,
} from './constants';

export function createOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: DONATION_CREATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.post('/v1/asso/donation', args);
      doRequest.then(
        (res) => {
          dispatch({
            type: DONATION_CREATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: DONATION_CREATE_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissCreateOneError() {
  return {
    type: DONATION_CREATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DONATION_CREATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createOnePending: true,
        createOneError: null,
      };

    case DONATION_CREATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        createOnePending: false,
        createOneError: null,
      };

    case DONATION_CREATE_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        createOnePending: false,
        createOneError: action.data.error,
      };

    case DONATION_CREATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createOneError: null,
      };

    default:
      return state;
  }
}
