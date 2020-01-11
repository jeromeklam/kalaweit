import {
  DONATION_SET_FILTERS,
} from '../../../../src/features/donation/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/donation/redux/setFilters';

describe('donation/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', DONATION_SET_FILTERS);
  });

  it('handles action type DONATION_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DONATION_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
