import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, jsonApiUpdate } from 'freejsonapi';
import {
  DONATION_UPDATE_ONE_BEGIN,
  DONATION_UPDATE_ONE_SUCCESS,
  DONATION_UPDATE_ONE_FAILURE,
  DONATION_UPDATE_ONE_DISMISS_ERROR,
  DONATION_UPDATE_ONE_UPDATE,
} from './constants';

export function updateOne(id, args = {}) {
  return (dispatch) => {
    dispatch({
      type: DONATION_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.put('/v1/asso/donation/' + id, args);
      doRequest.then(
        (res) => {
          dispatch({
            type: DONATION_UPDATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: DONATION_UPDATE_ONE_FAILURE,
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
    type: DONATION_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DONATION_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case DONATION_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case DONATION_UPDATE_ONE_FAILURE:
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

    case DONATION_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    case DONATION_UPDATE_ONE_UPDATE:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = jsonApiUpdate(myItems, 'FreeAsso_Donation', object);
      console.log(object);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
