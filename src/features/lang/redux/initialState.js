import { getEmptyJsonApi } from 'freejsonapi';

const initialState = {
  items: getEmptyJsonApi('FreeFW_Lang'),
  flags: [],
  loadMorePending: false,
  loadMoreError: null,
  LoadMoreFinish: false,
};

export default initialState;
