import { SESSION_UPDATE_QUICK_SEARCH } from './constants';
import { FILTER_MODE_OR, FILTER_OPER_LIKE, FILTER_SEARCH_QUICK } from 'freeassofront';

export function updateQuickSearch(value) {
  return {
    type: SESSION_UPDATE_QUICK_SEARCH,
    value: value,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SESSION_UPDATE_QUICK_SEARCH:
      let filters = state.filters;
      filters.init(FILTER_MODE_OR, FILTER_OPER_LIKE);
      filters.setSearch(FILTER_SEARCH_QUICK);
      filters.addFilter('sess_name', action.value);
      return {
        ...state,
        filters: filters,
      };

    default:
      return state;
  }
}
