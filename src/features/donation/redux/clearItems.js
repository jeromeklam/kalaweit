import { DONATION_CLEAR_ITEMS } from './constants';

export function clearItems() {
  return {
    type: DONATION_CLEAR_ITEMS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DONATION_CLEAR_ITEMS:
      return {
        ...state,
        items: [],
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
      };

    default:
      return state;
  }
}
