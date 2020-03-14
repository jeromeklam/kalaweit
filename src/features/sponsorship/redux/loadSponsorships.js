import { jsonApiNormalizer, objectToQueryString, buildModel } from 'freejsonapi';
import {
  SPONSORSHIP_LOAD_SPONSORSHIPS_INIT,
  SPONSORSHIP_LOAD_SPONSORSHIPS_BEGIN,
  SPONSORSHIP_LOAD_SPONSORSHIPS_SUCCESS,
  SPONSORSHIP_LOAD_SPONSORSHIPS_FAILURE,
  SPONSORSHIP_LOAD_SPONSORSHIPS_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function loadSponsorships(args = {}, reload = false) {
  return (dispatch, getState) => {
    const loaded = getState().sponsorship.loadSponsorshipsFinish;
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
          filter: args,
          sort: '-spo_to,-spo_from',
        };
        const addUrl = objectToQueryString(filter);
        const doRequest = freeAssoApi.get('/v1/asso/sponsorship' + addUrl, {});
        doRequest.then(
          res => {
            dispatch({
              type: SPONSORSHIP_LOAD_SPONSORSHIPS_SUCCESS,
              data: res,
              ...args,
            });
            resolve(res);
          },
          err => {
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
        sponsorshipsModels: [],
        cli_id: null,
        cau_id: null,
        emptyItem: null,
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
      const models = buildModel(list, 'FreeAsso_Sponsorship', null, {
        eager: true,
      }) || [];
      let cli_id = action.cli_id || null;
      let cau_id = action.cau_id || null;
      return {
        ...state,
        loadSponsorshipsPending: false,
        loadSponsorshipsError: null,
        loadSponsorshipsFinish: true,
        sponsorships: list,
        sponsorshipsModels: models,
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
