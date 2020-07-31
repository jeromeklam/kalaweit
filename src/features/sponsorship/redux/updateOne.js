import { jsonApiNormalizer, normalizedObjectUpdate } from 'freejsonapi';
import { freeAssoApi } from '../../../common';
import {
  SPONSORSHIP_UPDATE_ONE_BEGIN,
  SPONSORSHIP_UPDATE_ONE_SUCCESS,
  SPONSORSHIP_UPDATE_ONE_FAILURE,
  SPONSORSHIP_UPDATE_ONE_DISMISS_ERROR,
  SPONSORSHIP_UPDATE_ONE_UPDATE,
} from './constants';

export function updateOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: SPONSORSHIP_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const id = args.data.id;
      const doRequest = freeAssoApi.put('/v1/asso/sponsorship/' + id, args);
      doRequest.then(
        (res) => {
          dispatch({
            type: SPONSORSHIP_UPDATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SPONSORSHIP_UPDATE_ONE_FAILURE,
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
    type: SPONSORSHIP_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SPONSORSHIP_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case SPONSORSHIP_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case SPONSORSHIP_UPDATE_ONE_FAILURE:
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

    case SPONSORSHIP_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    case SPONSORSHIP_UPDATE_ONE_UPDATE:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items || [];
      let news = normalizedObjectUpdate(myItems, 'FreeAsso_Sponsorship', object);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
