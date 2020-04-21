import { RECEIPT_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: RECEIPT_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case RECEIPT_INIT_SORT:
      return {
        ...state,
        sort: [
          { col: 'rec_ts', way: 'down' },
          { col: 'rec_number', way: 'down' },
        ],
      };

    default:
      return state;
  }
}
