import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, normalizedObjectModeler } from 'freejsonapi';
import {
  CAUSE_LOAD_ONE_MEDIA_BEGIN,
  CAUSE_LOAD_ONE_MEDIA_SUCCESS,
  CAUSE_LOAD_ONE_MEDIA_FAILURE,
  CAUSE_LOAD_ONE_MEDIA_DISMISS_ERROR,
} from './constants';

export function loadOneMedia(args = {}) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_LOAD_ONE_MEDIA_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/cause_media/' + args);
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_LOAD_ONE_MEDIA_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_LOAD_ONE_MEDIA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadOneMediaError() {
  return {
    type: CAUSE_LOAD_ONE_MEDIA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_LOAD_ONE_MEDIA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOneMediaPending: true,
        loadOneMediaError: null,
        loadOneMediaItem: null,
      };

    case CAUSE_LOAD_ONE_MEDIA_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      item = normalizedObjectModeler(object, 'FreeAsso_CauseMedia', action.id, { eager: true });
      return {
        ...state,
        loadOneMediaPending: false,
        loadOneMediaError: null,
        loadOneMediaItem: item,
      };

    case CAUSE_LOAD_ONE_MEDIA_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOneMediaPending: false,
        loadOneMediaError: action.data.error,
      };

    case CAUSE_LOAD_ONE_MEDIA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneMediaError: null,
      };

    default:
      return state;
  }
}
