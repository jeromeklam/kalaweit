// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CLIENT_SET_SORT,
} from './constants';

export function setSort(col, way) {
  return {
    type: CLIENT_SET_SORT,
    col: col,
    way: way
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_SET_SORT:
      let sort = state.sort;
      let nSort = [];
      sort.forEach(elt => {
        if (elt.col !== action.col) {
          nSort.push(elt);
        }
      });
      if (action.way === 'up' || action.way === 'down') {
        const elt = {
          col: action.col,
          way: action.way,
        };
        nSort.push(elt);
      }
      return {
        ...state,
        sort: nSort,
      };

    default:
      return state;
  }
}
