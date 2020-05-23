import {Filter} from 'freeassofront';
import {
  CAUSE_INIT_FILTERS,
} from './constants';

export function initFilters(cautId) {
  return {
    type: CAUSE_INIT_FILTERS,
    cautId: cautId
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_INIT_FILTERS:
      let newFilters = new Filter();
      const now = new Date().toISOString();
      newFilters.addFilter('cau_to', now, 'gten');
      newFilters.addFilter('caut_id', action.cautId || 0, 'eq', true);
      return {
        ...state,
        filters: newFilters,
      };

    default:
      return state;
  }
}
