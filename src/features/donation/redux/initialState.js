import { Filter } from 'freeassofront';
import { getNewNormalizedObject } from 'freejsonapi';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_Donation'),
  models: [],
  donations: [],
  donationsModels: [],
  cli_id: null,
  cau_id: null,
  emptyItem: null,
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: new Filter(),
  sort: [{ col: 'id', way: 'down' }],
  loadMorePending: false,
  loadMoreError: null,
  createOnePending: false,
  createOneError: null,
  delOnePending: false,
  delOneError: null,
  loadOnePending: false,
  loadOneError: null,
  updateOnePending: false,
  updateOneError: null,
  loadDonationsPending: false,
  loadDonationsError: null,
};

export default initialState;
