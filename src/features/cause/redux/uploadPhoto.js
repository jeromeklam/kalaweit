import { freeAssoApi } from '../../../common';
import { buildSingleFromjson } from 'freejsonapi';
import {
  CAUSE_UPLOAD_PHOTO_BEGIN,
  CAUSE_UPLOAD_PHOTO_SUCCESS,
  CAUSE_UPLOAD_PHOTO_FAILURE,
  CAUSE_UPLOAD_PHOTO_DISMISS_ERROR,
} from './constants';

export function uploadPhoto(caum_id = 0, cau_id = 0, binary = null, name = null) {
  return dispatch => {
    dispatch({
      type: CAUSE_UPLOAD_PHOTO_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const datas = {
        cau_id: cau_id,
        blob: binary,
        title: name,
      };
      const doRequest = freeAssoApi.post(
        '/v1/asso/cause_media_blob',
        buildSingleFromjson('FreeAsso_CauseMediaBlob', datas),
      );
      doRequest.then(
        res => {
          dispatch({
            type: CAUSE_UPLOAD_PHOTO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: CAUSE_UPLOAD_PHOTO_FAILURE,
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
export function dismissUploadPhotoError() {
  return {
    type: CAUSE_UPLOAD_PHOTO_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_UPLOAD_PHOTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        uploadPhotoPending: true,
        uploadPhotoError: null,
      };

    case CAUSE_UPLOAD_PHOTO_SUCCESS:
      // The request is success
      return {
        ...state,
        uploadPhotoPending: false,
        uploadPhotoError: null,
      };

    case CAUSE_UPLOAD_PHOTO_FAILURE:
      // The request is failed
      return {
        ...state,
        uploadPhotoPending: false,
        uploadPhotoError: action.data.error,
      };

    case CAUSE_UPLOAD_PHOTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        uploadPhotoError: null,
      };

    default:
      return state;
  }
}
