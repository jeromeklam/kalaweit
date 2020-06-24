import { Filter } from 'freeassofront';
import { getEmptyJsonApi } from 'freejsonapi';

const initialState = {
  items: getEmptyJsonApi('FreeAsso_ClientCategory'),
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: new Filter(),
  sort: [{col:"clic_name",way:"up"}],
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  loadOnePending: false,
  loadOneError: null,
  createOnePending: false,
  createOneError: null,
  delOnePending: false,
  delOneError: null,
  updateOnePending: false,
  updateOneError: null,
};

export default initialState;
