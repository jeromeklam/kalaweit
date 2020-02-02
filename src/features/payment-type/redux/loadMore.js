import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, objectToQueryString, buildModel } from 'freejsonapi';
import {
  PAYMENT_TYPE_LOAD_MORE_INIT,
  PAYMENT_TYPE_LOAD_MORE_BEGIN,
  PAYMENT_TYPE_LOAD_MORE_SUCCESS,
  PAYMENT_TYPE_LOAD_MORE_FAILURE,
  PAYMENT_TYPE_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(args = {}, reload = false) {
  return (dispatch, getState) => {
    const loaded = getState().paymentType.loadMoreFinish;
    const loading = getState().paymentType.loadMorePending;
    if (!loading && (!loaded || reload)) {
      if (reload) {
        dispatch({
          type: PAYMENT_TYPE_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: PAYMENT_TYPE_LOAD_MORE_BEGIN,
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
        const doRequest = freeAssoApi.get('/v1/asso/payment_type' + addUrl, {});
        doRequest.then(
          res => {
            dispatch({
              type: PAYMENT_TYPE_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          err => {
            dispatch({
              type: PAYMENT_TYPE_LOAD_MORE_FAILURE,
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
export function dismissLoadMoreError() {
  return {
    type: PAYMENT_TYPE_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PAYMENT_TYPE_LOAD_MORE_INIT:
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

    case PAYMENT_TYPE_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case PAYMENT_TYPE_LOAD_MORE_SUCCESS:
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
          raw = buildModel(list, 'FreeAsso_PaymentType');
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

    case PAYMENT_TYPE_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case PAYMENT_TYPE_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
