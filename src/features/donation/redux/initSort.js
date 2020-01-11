// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  DONATION_INIT_SORT,
} from './constants';

export function initSort() {
  return {
    type: DONATION_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DONATION_INIT_SORT:
      return {
        ...state,
        sort: [{ col: 'don_ts', way: 'down' }],
      };

    default:
      return state;
  }
}
