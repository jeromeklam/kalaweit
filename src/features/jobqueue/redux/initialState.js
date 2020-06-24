import { Filter } from 'freeassofront';
import { getEmptyJsonApi } from 'freejsonapi';

const initialState = {
  items: getEmptyJsonApi('FreeFW_Jobqueue'),
  pendings: [],
  page_number: 1,
  page_size: 999,
  filters: new Filter(),
  sort: [{col:"jobq_next_retry",way:"down"}],
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
};

export default initialState;
