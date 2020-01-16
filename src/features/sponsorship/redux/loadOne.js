import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, buildModel } from 'freejsonapi';
import {
  SPONSORSHIP_LOAD_ONE_BEGIN,
  SPONSORSHIP_LOAD_ONE_SUCCESS,
  SPONSORSHIP_LOAD_ONE_FAILURE,
  SPONSORSHIP_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: SPONSORSHIP_LOAD_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/sponsorship/' + args, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: SPONSORSHIP_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SPONSORSHIP_LOAD_ONE_FAILURE,
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
    type: SPONSORSHIP_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SPONSORSHIP_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
      };

    case SPONSORSHIP_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      let emptyItem = state.emptyItem;
      item = buildModel(object, 'FreeAsso_Sponsorship', action.id, {eager: true});
      if (action.id <= 0) {
        emptyItem = {...item};
      }
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: item,
        loadOneError: null,
        emptyItem: emptyItem,
      };

    case SPONSORSHIP_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneError: action.data.error,
      };

    case SPONSORSHIP_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
