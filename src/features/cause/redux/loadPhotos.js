import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, objectToQueryString, buildModel } from 'freejsonapi';
import {
  CAUSE_LOAD_PHOTOS_INIT,
  CAUSE_LOAD_PHOTOS_BEGIN,
  CAUSE_LOAD_PHOTOS_SUCCESS,
  CAUSE_LOAD_PHOTOS_FAILURE,
  CAUSE_LOAD_PHOTOS_DISMISS_ERROR,
} from './constants';

export function loadPhotos(args = {}, reload = false) {
  return (dispatch, getState) => {
    const loaded =  getState().cause.loadPhotosFinish;
    if (!loaded || reload) {
      if (reload) {
        dispatch({
          type: CAUSE_LOAD_PHOTOS_INIT,
        });
      } else {
        dispatch({
          type: CAUSE_LOAD_PHOTOS_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        const filter = {
          filter: {
            cau_id: args,
            caum_type: 'PHOTO',
          }
        }
        const addUrl = objectToQueryString(filter);
        const doRequest = freeAssoApi.get('/v1/asso/cause_media' + addUrl, {});
        doRequest.then(
          (res) => {
            dispatch({
              type: CAUSE_LOAD_PHOTOS_SUCCESS,
              data: res,
              cau_id: args,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: CAUSE_LOAD_PHOTOS_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
      });
      return promise;
    }
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissLoadPhotosError() {
  return {
    type: CAUSE_LOAD_PHOTOS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_LOAD_PHOTOS_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadPhotosPending: true,
        loadPhotosError: null,
        loadPhotosFinish: false,
        photos: [],
        photosItem: null,
      };

    case CAUSE_LOAD_PHOTOS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadPhotosPending: true,
        loadPhotosError: null,
      };

    case CAUSE_LOAD_PHOTOS_SUCCESS:
      // The request is success
      let list = {};
      let nbre = 0;
      let result = false;
      if (action.data && action.data.data) {
        result = action.data.data;
      }
      if (result.data) {
        nbre = result.data.length;
      }
      if (nbre > 0) {
        list = jsonApiNormalizer(result);
      } else {
        list = [];
      }
      let photosItem = buildModel(state.items, 'FreeAsso_Cause', action.cau_id);
      return {
        ...state,
        loadPhotosPending: false,
        loadPhotosError: null,
        loadPhotosFinish: true,
        photos: list,
        photosItem: photosItem,
      };

    case CAUSE_LOAD_PHOTOS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadPhotosPending: false,
        loadPhotosError: action.data.error,
      };

    case CAUSE_LOAD_PHOTOS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadPhotosError: null,
      };

    default:
      return state;
  }
}
