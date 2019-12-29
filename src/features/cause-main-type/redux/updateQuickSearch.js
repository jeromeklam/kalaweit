// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CAUSE_MAIN_TYPE_UPDATE_QUICK_SEARCH,
} from './constants';
import {
  FILTER_MODE_OR,
  FILTER_OPER_LIKE,
  FILTER_SEARCH_QUICK
} from '../../filter';

export function updateQuickSearch(value) {
  return {
    type: CAUSE_MAIN_TYPE_UPDATE_QUICK_SEARCH,
    value: value,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_MAIN_TYPE_UPDATE_QUICK_SEARCH:
      let filters = state.filters;
      filters.init(FILTER_MODE_OR, FILTER_OPER_LIKE);
      filters.setSearch(FILTER_SEARCH_QUICK)
      filters.addFilter('camt_name', action.value);
      return {
        ...state,
        filters: filters
      };

    default:
      return state;
  }
}
