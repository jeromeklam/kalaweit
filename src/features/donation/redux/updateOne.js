import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, jsonApiUpdate } from 'freejsonapi';
import {
  DONATION_UPDATE_ONE_BEGIN,
  DONATION_UPDATE_ONE_SUCCESS,
  DONATION_UPDATE_ONE_FAILURE,
  DONATION_UPDATE_ONE_DISMISS_ERROR,
  DONATION_UPDATE_ONE_UPDATE,
} from './constants';

export function updateOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: DONATION_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const id = args.data.id;
      console.log("FK modif don",args);
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
      console.log("FK updateOne success");
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
      console.log("FK updateOne failure", error);
      return {
        ...state,
        updateOnePending: false,
        updateOneError: action.data.error,
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
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
