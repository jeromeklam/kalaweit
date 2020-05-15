import {
  SUBSPECIES_SET_SORT,
} from './constants';

export function setSort(sort) {
  return {
    type: SUBSPECIES_SET_SORT,
    sort: sort,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SUBSPECIES_SET_SORT:
      return {
        ...state,
        sort: action.sort,
      };

    default:
      return state;
  }
}
