import { Filter } from 'freeassofront';
import { SESSION_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: SESSION_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SESSION_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
