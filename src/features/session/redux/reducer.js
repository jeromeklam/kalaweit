import initialState from './initialState';
import { reducer as loadMoreReducer } from './loadMore';
import { reducer as loadOneReducer } from './loadOne';
import { reducer as updateOneReducer } from './updateOne';
import { reducer as createOneReducer } from './createOne';
import { reducer as clearItemsReducer } from './clearItems';
import { reducer as delOneReducer } from './delOne';
import { reducer as setSortReducer } from './setSort';
import { reducer as setFiltersReducer } from './setFilters';
import { reducer as updateQuickSearchReducer } from './updateQuickSearch';
import { reducer as updateSortReducer } from './updateSort';
import { reducer as initSortReducer } from './initSort';
import { reducer as initFiltersReducer } from './initFilters';

const reducers = [
  loadMoreReducer,
  loadOneReducer,
  updateOneReducer,
  createOneReducer,
  clearItemsReducer,
  delOneReducer,
  setSortReducer,
  setFiltersReducer,
  updateQuickSearchReducer,
  updateSortReducer,
  initSortReducer,
  initFiltersReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
