// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CLIENT_SET_FILTERS,
} from './constants';

export function setFilters(filters) {
  return {
    type: CLIENT_SET_FILTERS,
    filters: filters
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };

    default:
      return state;
  }
}
