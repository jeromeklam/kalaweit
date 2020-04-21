import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer } from 'freejsonapi';
import {
  CAUSE_LOAD_SPONSORS_INIT,
  CAUSE_LOAD_SPONSORS_BEGIN,
  CAUSE_LOAD_SPONSORS_SUCCESS,
  CAUSE_LOAD_SPONSORS_FAILURE,
  CAUSE_LOAD_SPONSORS_DISMISS_ERROR,
} from './constants';

export function loadSponsors(args = {}, reload = false) {
  
  return (dispatch, getState) => {
    dispatch({
      type: CAUSE_LOAD_SPONSORS_BEGIN,
    });
    const loaded =  getState().cause.loadPhotosFinish;
    if (!loaded || reload) {
      if (reload) {
        dispatch({
          type: CAUSE_LOAD_SPONSORS_INIT,
        });
      } else {
        dispatch({
          type: CAUSE_LOAD_SPONSORS_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        const doRequest = freeAssoApi.get('/v1/asso/cause/current_sponsors/' + args.cau_id);
        doRequest.then(
          (res) => {
            dispatch({
              type: CAUSE_LOAD_SPONSORS_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: CAUSE_LOAD_SPONSORS_FAILURE,
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

export function dismissLoadSponsorsError() {
  return {
    type: CAUSE_LOAD_SPONSORS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_LOAD_SPONSORS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadSponsorsPending: true,
        loadSponsorsError: null,
      };

    case CAUSE_LOAD_SPONSORS_SUCCESS:
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
        loadSponsorsPending: false,
        loadSponsorsError: null,
        sponsors: list,
      };

    case CAUSE_LOAD_SPONSORS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadSponsorsPending: false,
        loadSponsorsError: action.data.error,
      };

    case CAUSE_LOAD_SPONSORS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadSponsorsError: null,
      };

    default:
      return state;
  }
}
