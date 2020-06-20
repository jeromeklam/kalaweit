import { CERTIFICATE_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: CERTIFICATE_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CERTIFICATE_INIT_SORT:
      return {
        ...state,
        sort: [
          { col: 'cert_ts', way: 'down' },
          { col: 'cert_fullname', way: 'down' },
        ],
      };

    default:
      return state;
  }
}
