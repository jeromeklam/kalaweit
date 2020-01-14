import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, objectToQueryString, buildModel } from 'freejsonapi';
import {
  SPONSORSHIP_LOAD_SPONSORSHIPS_INIT,
  SPONSORSHIP_LOAD_SPONSORSHIPS_BEGIN,
  SPONSORSHIP_LOAD_SPONSORSHIPS_SUCCESS,
  SPONSORSHIP_LOAD_SPONSORSHIPS_FAILURE,
  SPONSORSHIP_LOAD_SPONSORSHIPS_DISMISS_ERROR,
} from './constants';

export function loadSponsorships(args = {}, reload = false) {
  return (dispatch, getState) => {
    const loaded =  getState().cause.loadPhotosFinish;
    if (!loaded || reload) {
      if (reload) {
        dispatch({
          type: SPONSORSHIP_LOAD_SPONSORSHIPS_INIT,
        });
      } else {
        dispatch({
          type: SPONSORSHIP_LOAD_SPONSORSHIPS_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        let filter = {
          filter: args
        };
        const addUrl = objectToQueryString(filter);
        const doRequest = freeAssoApi.get('/v1/asso/sponsorship' + addUrl, {});
        doRequest.then(
          (res) => {
            dispatch({
              type: SPONSORSHIP_LOAD_SPONSORSHIPS_SUCCESS,
              data: res,
              ...args
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: SPONSORSHIP_LOAD_SPONSORSHIPS_FAILURE,
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
export function dismissLoadSponsorshipsError() {
  return {
    type: SPONSORSHIP_LOAD_SPONSORSHIPS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SPONSORSHIP_LOAD_SPONSORSHIPS_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadSponsorshipsPending: true,
        loadSponsorshipsError: null,
        loadSponsorshipsFinish: false,
        sponsorships: [],
        cli_id: null,
        cau_id: null,
      };

    case SPONSORSHIP_LOAD_SPONSORSHIPS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadSponsorshipsPending: true,
        loadSponsorshipsError: null,
      };

    case SPONSORSHIP_LOAD_SPONSORSHIPS_SUCCESS:
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
      let cli_id = action.cli_id || null;
      let cau_id = action.cau_id || null;
      return {
        ...state,
        loadSponsorshipsPending: false,
        loadSponsorshipsError: null,
        loadSponsorshipsFinish: true,
        sponsorships: list,
        cli_id: cli_id,
        cau_id: cau_id,
      };

    case SPONSORSHIP_LOAD_SPONSORSHIPS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadSponsorshipsPending: false,
        loadSponsorshipsError: action.data.error,
      };

    case SPONSORSHIP_LOAD_SPONSORSHIPS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadSponsorshipsError: null,
      };

    default:
      return state;
  }
}
