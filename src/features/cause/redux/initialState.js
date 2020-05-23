import { Filter } from 'freeassofront';
//import { FILTER_OPER_GREATER_OR_EQUAL_OR_NULL } from 'freeassofront/src/features/filter/index.js';

let initialFilters = new Filter();
const now = new Date().toISOString();
initialFilters.addFilter('cau_to', now, 'gten');
initialFilters.addFilter('caut_id', 355, 'eq', true);

const initialState = {
  items: [],
  news: [],
  photos: [],
  photosItem: null,
  sponsors: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  tab: "1",
  filters: initialFilters,
  sort: [{col:"cau_name",way:"up"}],
  loadMorePending: false,
  loadMoreFinish: false,
  loadMoreError: null,
  loadOnePending: false,
  loadOneItem: null,
  loadOneError: null,
  createOnePending: false,
  createOneError: null,
  updateOnePending: false,
  updateOneError: null,
  delOnePending: false,
  delOneError: null,
  loadPhotosPending: false,
  loadPhotosError: null,
  uploadPhotoPending: false,
  uploadPhotoError: null,
  delCauseMediaPending: false,
  delCauseMediaError: null,
  loadNewsPending: false,
  loadNewsError: null,
  loadOneMediaPending: false,
  loadOneMediaError: null,
  loadOneMediaItem: null,
  loadSponsorsPending: false,
  loadSponsorsError: null,
};

export default initialState;
