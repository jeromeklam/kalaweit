import { EMAIL_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: EMAIL_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EMAIL_INIT_SORT:
      return {
        ...state,
        sort: [{ col: 'email_subject', way: 'up' }],
      };

    default:
      return state;
  }
}
