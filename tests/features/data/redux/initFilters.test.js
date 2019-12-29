import {
  DATA_INIT_FILTERS,
} from '../../../../src/features/data/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/data/redux/initFilters';

describe('data/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', DATA_INIT_FILTERS);
  });

  it('handles action type DATA_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DATA_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
