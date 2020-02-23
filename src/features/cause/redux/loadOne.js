import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, buildModel } from 'freejsonapi';
import {
  CAUSE_LOAD_ONE_BEGIN,
  CAUSE_LOAD_ONE_SUCCESS,
  CAUSE_LOAD_ONE_FAILURE,
  CAUSE_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return dispatch => {
    dispatch({
      type: CAUSE_LOAD_ONE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/cause/' + args);
      doRequest.then(
        res => {
          dispatch({
            type: CAUSE_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: CAUSE_LOAD_ONE_FAILURE,
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
    type: CAUSE_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
      };

    case CAUSE_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      item = buildModel(object, 'FreeAsso_Cause', action.id, { eager: true });
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: item,
        loadOneError: null,
      };

    case CAUSE_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneError: action.data.error,
      };

    case CAUSE_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
