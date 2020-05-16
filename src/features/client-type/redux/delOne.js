import { jsonApiNormalizer } from 'freejsonapi';
import { freeAssoApi } from '../../../common';
import {
  CLIENT_TYPE_DEL_ONE_BEGIN,
  CLIENT_TYPE_DEL_ONE_SUCCESS,
  CLIENT_TYPE_DEL_ONE_FAILURE,
  CLIENT_TYPE_DEL_ONE_DISMISS_ERROR,
} from './constants';

export function delOne(args = {}) {
  return (dispatch) => { 
    dispatch({
      type: CLIENT_TYPE_DEL_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const id = args;
      const doRequest = freeAssoApi.delete('/v1/asso/client_type/' + id);
      doRequest.then(
        (res) => {
          dispatch({
            type: CLIENT_TYPE_DEL_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CLIENT_TYPE_DEL_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissDelOneError() {
  return {
    type: CLIENT_TYPE_DEL_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_TYPE_DEL_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        delOnePending: true,
        delOneError: null,
      };

    case CLIENT_TYPE_DEL_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        delOnePending: false,
        delOneError: null,
      };

    case CLIENT_TYPE_DEL_ONE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        delOnePending: false,
        delOneError: error,
      };

    case CLIENT_TYPE_DEL_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        delOneError: null,
      };

    default:
      return state;
  }
}
