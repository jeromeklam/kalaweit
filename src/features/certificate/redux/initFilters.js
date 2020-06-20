import { Filter } from 'freeassofront';
import { CERTIFICATE_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: CERTIFICATE_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CERTIFICATE_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
