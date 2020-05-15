import {Filter} from 'freeassofront';
import {
  SUBSPECIES_INIT_FILTERS,
} from './constants';

export function initFilters() {
  return {
    type: SUBSPECIES_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SUBSPECIES_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
