import {Filter} from 'freeassofront';

const initialState = {
  items: [],
  page_number: 1,
  page_size: 0,
  filters: new Filter(),
  sort: [{col:"rate_money_from",way:"up"}, {col:"rate_money_to",way:"up"}],
  loadMorePending: false,
  loadMoreError: null,
};

export default initialState;
