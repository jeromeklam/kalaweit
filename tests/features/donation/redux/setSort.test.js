import {
  DONATION_SET_SORT,
} from '../../../../src/features/donation/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/donation/redux/setSort';

describe('donation/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', DONATION_SET_SORT);
  });

  it('handles action type DONATION_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DONATION_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
