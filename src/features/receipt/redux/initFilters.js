import { Filter } from 'freeassofront';
import { RECEIPT_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: RECEIPT_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case RECEIPT_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
