import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, objectToQueryString, normalizedObjectModeler } from 'freejsonapi';
import {
  DONATION_LOAD_DONATIONS_INIT,
  DONATION_LOAD_DONATIONS_BEGIN,
  DONATION_LOAD_DONATIONS_SUCCESS,
  DONATION_LOAD_DONATIONS_FAILURE,
  DONATION_LOAD_DONATIONS_DISMISS_ERROR,
} from './constants';

export function loadDonations(args = {}, reload = false) {
  return (dispatch, getState) => {
    const loaded = getState().donation.loadDonationsFinish;
    if (!loaded || reload) {
      if (reload) {
        dispatch({
          type: DONATION_LOAD_DONATIONS_INIT,
        });
      } else {
        dispatch({
          type: DONATION_LOAD_DONATIONS_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        let filter = {
          filter: args,
          sort: '-don_ask_ts,-don_ts',
          page: {number:1, size: 100}
        };
        const addUrl = objectToQueryString(filter);
        const doRequest = freeAssoApi.get('/v1/asso/donation' + addUrl, {});
        doRequest.then(
          res => {
            dispatch({
              type: DONATION_LOAD_DONATIONS_SUCCESS,
              data: res,
              ...args,
            });
            resolve(res);
          },
          err => {
            dispatch({
              type: DONATION_LOAD_DONATIONS_FAILURE,
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

export function dismissLoadDonationsError() {
  return {
    type: DONATION_LOAD_DONATIONS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DONATION_LOAD_DONATIONS_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadDonationsPending: true,
        loadDonationsError: null,
        loadDonationsFinish: false,
        donations: [],
        donationsModels: [],
        cli_id: null,
        cau_id: null,
        emptyItem: null,
      };

    case DONATION_LOAD_DONATIONS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadDonationsPending: true,
        loadDonationsError: null,
      };

    case DONATION_LOAD_DONATIONS_SUCCESS:
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
      const donations = normalizedObjectModeler(list, 'FreeAsso_Donation') || false;
      return {
        ...state,
        loadDonationsPending: false,
        loadDonationsError: null,
        donations: list,
        donationsModels: donations,
        cli_id: cli_id,
        cau_id: cau_id,
      };

    case DONATION_LOAD_DONATIONS_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        loadDonationsPending: false,
        loadDonationsError: error,
      };

    case DONATION_LOAD_DONATIONS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadDonationsError: null,
      };

    default:
      return state;
  }
}
