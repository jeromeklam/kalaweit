import {
  DATA_SET_FILTERS,
} from '../../../../src/features/data/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/data/redux/setFilters';

describe('data/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', DATA_SET_FILTERS);
  });

  it('handles action type DATA_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DATA_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
