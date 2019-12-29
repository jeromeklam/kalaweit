// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CAUSE_TYPE_INIT_SORT,
} from './constants';

export function initSort() {
  return {
    type: CAUSE_TYPE_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_TYPE_INIT_SORT:
      return {
        ...state,
        sort: [{col:"caut_name",way:"up"}],
      };

    default:
      return state;
  }
}