import { getNewNormalizedObject } from 'freejsonapi';

const initialState = {
  items: getNewNormalizedObject('FreeFW_Lang'),
  flags: [],
  loadMorePending: false,
  loadMoreError: null,
  LoadMoreFinish: false,
};

export default initialState;
