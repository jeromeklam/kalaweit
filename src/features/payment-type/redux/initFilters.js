import { Filter } from 'freeassofront';
import { PAYMENT_TYPE_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: PAYMENT_TYPE_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PAYMENT_TYPE_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
