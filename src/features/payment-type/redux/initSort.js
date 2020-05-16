import { PAYMENT_TYPE_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: PAYMENT_TYPE_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PAYMENT_TYPE_INIT_SORT:
      return {
        ...state,
        sort: [{ col: 'ptyp_name', way: 'up' }],
      };

    default:
      return state;
  }
}
