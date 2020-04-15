import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, objectToQueryString, buildModel } from 'freejsonapi';
import {
  SESSION_LOAD_MORE_INIT,
  SESSION_LOAD_MORE_BEGIN,
  SESSION_LOAD_MORE_SUCCESS,
  SESSION_LOAD_MORE_FAILURE,
  SESSION_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(args = {}, reload = false) {
  return (dispatch, getState) => {
    const loaded = getState().session.loadMoreFinish;
    const loading = getState().session.loadMorePending;
    if (!loading && (!loaded || reload)) {
      if (reload) {
        dispatch({
          type: SESSION_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: SESSION_LOAD_MORE_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        let params = {
          page: {
            number: getState().paymentType.page_number,
            size: getState().paymentType.page_size,
          },
        };
        if (args && Object.keys(args).length > 0 && args !== '') {
          params.filter = {
            and: {
              ptyp_name: args,
            },
          };
        }
        const addUrl = objectToQueryString(params);
        const doRequest = freeAssoApi.get('/v1/asso/session' + addUrl, {});
        doRequest.then(
          (res) => {
            dispatch({
              type: SESSION_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: SESSION_LOAD_MORE_FAILURE,
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

export function dismissLoadMoreError() {
  return {
    type: SESSION_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SESSION_LOAD_MORE_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        loadMoreFinish: false,
        items: [],
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
      };
    case SESSION_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case SESSION_LOAD_MORE_SUCCESS:
      // The request is success
      let list = [];
      let raw = [];
      let nbre = 0;
      let result = false;
      if (action.data && action.data.data) {
        result = action.data.data;
      }
      if (result.data) {
        nbre = result.data.length;
      }
      if (nbre > 0) {
        if (state.items) {
          list = jsonApiNormalizer(result, state.items);
          raw = buildModel(list, 'FreeAsso_Session');
        } else {
          list = jsonApiNormalizer(result);
        }
      } else {
        list = state.items;
      }
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: null,
        loadMoreFinish: nbre < state.page_size,
        items: list,
        raw: raw,
        page_number: state.page_number + 1,
      };

    case SESSION_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case SESSION_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
