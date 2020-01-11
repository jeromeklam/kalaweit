import { Filter } from 'freeassofront';
import { DONATION_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: DONATION_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DONATION_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
