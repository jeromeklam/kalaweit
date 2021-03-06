import { freeAssoApi } from '../../../common';
import { objectToQueryString, jsonApiNormalizer } from 'freejsonapi';
import {
  SITE_FILTER_BEGIN,
  SITE_FILTER_SUCCESS,
  SITE_FILTER_FAILURE,
  SITE_FILTER_DISMISS_ERROR,
} from './constants';

export function filter(args = {}) {
  return (dispatch, getState) => {
    dispatch({
      type: SITE_FILTER_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const params = {
        page: { number: getState().site.page_number, size: getState().site.page_size },
        filter: { 
          and: {
            site_name: args
          }
        }
      };
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/asso/site' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: SITE_FILTER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SITE_FILTER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissFilterError() {
  return {
    type: SITE_FILTER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_FILTER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        filterPending: true,
        filterError: null,
      };

    case SITE_FILTER_SUCCESS:
      // The request is success
      return {
        ...state,
        filterPending: false,
        filterError: null,
      };

    case SITE_FILTER_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        filterPending: false,
        filterError: error,
      };

    case SITE_FILTER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        filterError: null,
      };

    default:
      return state;
  }
}
