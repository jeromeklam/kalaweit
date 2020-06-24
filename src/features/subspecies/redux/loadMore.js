import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, objectToQueryString, getEmptyJsonApi } from 'freejsonapi';
import {
  SUBSPECIES_LOAD_MORE_INIT,
  SUBSPECIES_LOAD_MORE_BEGIN,
  SUBSPECIES_LOAD_MORE_SUCCESS,
  SUBSPECIES_LOAD_MORE_FAILURE,
  SUBSPECIES_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(args = {}, reload = false) {
  return (dispatch, getState) => {
    const loaded = getState().subspecies.loadMoreFinish;
    const loading = getState().subspecies.loadMorePending;
    if (!loading && (!loaded || reload)) {
      if (reload) {
        dispatch({
          type: SUBSPECIES_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: SUBSPECIES_LOAD_MORE_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        let filters = getState().subspecies.filters.asJsonApiObject()
        let params = {
          page: { number: getState().subspecies.page_number, size: getState().subspecies.page_size },
          ...filters
        };
        let sort = '';
        getState().subspecies.sort.forEach(elt => {
          let add = elt.col;
          if (elt.way === 'down') {
            add = '-' + add;
          }
          if (sort === '') {
            sort = add;
          } else {
            sort = sort + ',' + add;
          }
        });
        if (sort !== '') {
          params.sort = sort;
        }
        const addUrl = objectToQueryString(params);
        const doRequest = freeAssoApi.get('/v1/asso/subspecies' + addUrl, {});
        doRequest.then(
          res => {
            dispatch({
              type: SUBSPECIES_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          err => {
            dispatch({
              type: SUBSPECIES_LOAD_MORE_FAILURE,
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
    type: SUBSPECIES_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SUBSPECIES_LOAD_MORE_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        loadMoreFinish: false,
        items: getEmptyJsonApi('FreeAsso_Subspecies'),
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
      };

    case SUBSPECIES_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case SUBSPECIES_LOAD_MORE_SUCCESS:
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

    case SUBSPECIES_LOAD_MORE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: error,
      };

    case SUBSPECIES_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
