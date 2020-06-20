import {
  Filter,
  FILTER_MODE_AND,
  FILTER_OPER_GREATER_OR_EQUAL_OR_NULL,
  FILTER_OPER_EQUAL,
} from 'freeassofront';
import { CAUSE_INIT_FILTERS } from './constants';

export function initFilters(cautId) {
  return {
    type: CAUSE_INIT_FILTERS,
    cautId: cautId,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_INIT_FILTERS:
      let newFilters = new Filter();
      const now = new Date().toISOString();
      newFilters.addFilter('cau_to', now, FILTER_OPER_GREATER_OR_EQUAL_OR_NULL);
      newFilters.addFilter('caut_id', action.cautId || 0, FILTER_OPER_EQUAL, true);
      newFilters.setMode(FILTER_MODE_AND);
      return {
        ...state,
        filters: newFilters,
      };

    default:
      return state;
  }
}
