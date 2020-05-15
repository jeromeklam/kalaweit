import {
  SPECIES_INIT_SORT,
} from './constants';

export function initSort() {
  return {
    type: SPECIES_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SPECIES_INIT_SORT:
      return {
        ...state,
        sort: [{col:"spe_name",way:"up"}],
      };

    default:
      return state;
  }
}
