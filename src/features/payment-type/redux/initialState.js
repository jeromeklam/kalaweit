import { Filter } from 'freeassofront';

const initialState = {
  items: [],
  page_number: 1,
  page_size: 999999,
  filters: new Filter(),
  sort: [{ col: 'ptyp_name', way: 'up' }],
  emptyItem: null,
  loadMorePending: false,
  loadMoreFinish: false,
  loadMoreError: null,
  loadOnePending: false,
  loadOneError: null,
  createOnePending: false,
  createOneError: null,
  updateOnePending: false,
  updateOneError: null,
  delOnePending: false,
  delOneError: null,
};

export default initialState;
