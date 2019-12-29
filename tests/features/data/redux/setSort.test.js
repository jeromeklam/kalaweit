import {
  DATA_SET_SORT,
} from '../../../../src/features/data/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/data/redux/setSort';

describe('data/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', DATA_SET_SORT);
  });

  it('handles action type DATA_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DATA_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
