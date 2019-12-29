import {
  DATA_INIT_SORT,
} from '../../../../src/features/data/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/data/redux/initSort';

describe('data/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', DATA_INIT_SORT);
  });

  it('handles action type DATA_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DATA_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
