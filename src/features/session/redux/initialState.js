import { Filter } from 'freeassofront';

const initialState = {
  items: [],
  raw: [],
  page_number: 1,
  page_size: 999999,
  filters: new Filter(),
  sort: [{ col: 'sess_name', way: 'up' }],
  emptyItem: null,
  loadMorePending: false,
  loadMoreError: null,
};

export default initialState;
