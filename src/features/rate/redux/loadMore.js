import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer } from 'freejsonapi';
import {
  RATE_LOAD_MORE_BEGIN,
  RATE_LOAD_MORE_SUCCESS,
  RATE_LOAD_MORE_FAILURE,
  RATE_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(args = {}) {
  return (dispatch) => {
    dispatch({
      type: RATE_LOAD_MORE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/core/rate/latest', {});
      doRequest.then(
        (res) => {
          dispatch({
            type: RATE_LOAD_MORE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: RATE_LOAD_MORE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissLoadMoreError() {
  return {
    type: RATE_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case RATE_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case RATE_LOAD_MORE_SUCCESS:
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
        if (state.items) {
          list = jsonApiNormalizer(result, state.items);
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
        loadMoreFinish: (nbre < state.page_size),
        items: list,
        page_number: state.page_number+1
      };

    case RATE_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case RATE_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
