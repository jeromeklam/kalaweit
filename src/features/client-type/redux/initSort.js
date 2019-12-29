// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CLIENT_TYPE_INIT_SORT,
} from './constants';

export function initSort() {
  return {
    type: CLIENT_TYPE_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_TYPE_INIT_SORT:
      return {
        ...state,
        sort: [{col:"clit_name",way:"up"}],
      };

    default:
      return state;
  }
}
