import {Filter} from 'freeassofront';

const initialState = {
  items: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: new Filter(),
  sort: [{col:"rec_ts",way:"down"}, {col:"rec_number",way:"down"}],
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
};

export default initialState;
