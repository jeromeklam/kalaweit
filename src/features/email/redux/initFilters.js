import { Filter } from '../../filter';
import {
  EMAIL_INIT_FILTERS,
} from './constants';

export function initFilters() {
  return {
    type: EMAIL_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EMAIL_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
