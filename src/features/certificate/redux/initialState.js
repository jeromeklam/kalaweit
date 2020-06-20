import { Filter } from 'freeassofront';

const initialState = {
  items: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: new Filter(),
  sort: [
    { col: 'cert_ts', way: 'down' },
    { col: 'cert_fullname', way: 'down' },
  ],
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  loadOnePending: false,
  loadOneError: null,
  loadOneItem: null,
  emptyItem: null,
};

export default initialState;
