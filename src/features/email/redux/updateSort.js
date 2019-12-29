// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { EMAIL_UPDATE_SORT } from './constants';

export function updateSort(col, way, pos = 99) {
  return {
    type: EMAIL_UPDATE_SORT,
    col: col,
    way: way,
    pos: pos,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EMAIL_UPDATE_SORT:
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
        if (action.pos >= nSort.length) {
          nSort.push(elt);
        } else {
          nSort = nSort.splice(action.pos - 1, 0, elt);
        }
      }
      return {
        ...state,
        sort: nSort,
      };

    default:
      return state;
  }
}
