import {
  DONATION_INIT_FILTERS,
} from '../../../../src/features/donation/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/donation/redux/initFilters';

describe('donation/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', DONATION_INIT_FILTERS);
  });

  it('handles action type DONATION_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DONATION_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
