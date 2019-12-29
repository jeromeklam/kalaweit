import {
  DATA_UPDATE_SORT,
} from '../../../../src/features/data/redux/constants';

import {
  updateSort,
  reducer,
} from '../../../../src/features/data/redux/updateSort';

describe('data/redux/updateSort', () => {
  it('returns correct action by updateSort', () => {
    expect(updateSort()).toHaveProperty('type', DATA_UPDATE_SORT);
  });

  it('handles action type DATA_UPDATE_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DATA_UPDATE_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
