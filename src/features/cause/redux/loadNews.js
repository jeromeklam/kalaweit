import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, objectToQueryString } from 'freejsonapi';
import {
  CAUSE_LOAD_NEWS_INIT,
  CAUSE_LOAD_NEWS_BEGIN,
  CAUSE_LOAD_NEWS_SUCCESS,
  CAUSE_LOAD_NEWS_FAILURE,
  CAUSE_LOAD_NEWS_DISMISS_ERROR,
} from './constants';

export function loadNews(args = {}, reload = false) {
  return (dispatch, getState) => {
    const loaded =  getState().cause.loadNewsFinish;
    if (!loaded || reload) {
      if (reload) {
        dispatch({
          type: CAUSE_LOAD_NEWS_INIT,
        });
      } else {
        dispatch({
          type: CAUSE_LOAD_NEWS_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        const filter = {
          filter: {
            cau_id: args,
            caum_type: 'HTML',
          }
        }
        const addUrl = objectToQueryString(filter);
        const doRequest = freeAssoApi.get('/v1/asso/cause_media' + addUrl, {});
        doRequest.then(
          (res) => {
            dispatch({
              type: CAUSE_LOAD_NEWS_SUCCESS,
              data: res,
              cau_id: args,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: CAUSE_LOAD_NEWS_FAILURE,
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
export function dismissLoadNewsError() {
  return {
    type: CAUSE_LOAD_NEWS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_LOAD_NEWS_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadNewsPending: true,
        loadNewsError: null,
        loadNewsFinish: false,
        news: [],
        newsItem: null,
      };

    case CAUSE_LOAD_NEWS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadNewsPending: true,
        loadNewsError: null,
      };

    case CAUSE_LOAD_NEWS_SUCCESS:
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
      return {
        ...state,
        loadNewsPending: false,
        loadNewsError: null,
        loadNewsFinish: true,
        news: list,
      };

    case CAUSE_LOAD_NEWS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadNewsPending: false,
        loadNewsError: action.data.error,
      };

    case CAUSE_LOAD_NEWS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadNewsError: null,
      };

    default:
      return state;
  }
}
