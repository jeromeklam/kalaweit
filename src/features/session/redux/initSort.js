import { SESSION_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: SESSION_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SESSION_INIT_SORT:
      return {
        ...state,
        sort: [{ col: 'sess_name', way: 'up' }],
      };

    default:
      return state;
  }
}
