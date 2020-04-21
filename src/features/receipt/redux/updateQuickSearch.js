import { RECEIPT_UPDATE_QUICK_SEARCH } from './constants';
import { FILTER_MODE_OR, FILTER_OPER_LIKE, FILTER_SEARCH_QUICK } from 'freeassofront';

export function updateQuickSearch() {
  return {
    type: RECEIPT_UPDATE_QUICK_SEARCH,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case RECEIPT_UPDATE_QUICK_SEARCH:
      let filters = state.filters;
      filters.init(FILTER_MODE_OR, FILTER_OPER_LIKE);
      filters.setSearch(FILTER_SEARCH_QUICK);
      filters.addFilter('rec_fullname', action.value);
      filters.addFilter('rec_email', action.value);
      return {
        ...state,
        filters: filters,
      };

    default:
      return state;
  }
}
