import {
  DONATION_UPDATE_SORT,
} from '../../../../src/features/donation/redux/constants';

import {
  updateSort,
  reducer,
} from '../../../../src/features/donation/redux/updateSort';

describe('donation/redux/updateSort', () => {
  it('returns correct action by updateSort', () => {
    expect(updateSort()).toHaveProperty('type', DONATION_UPDATE_SORT);
  });

  it('handles action type DONATION_UPDATE_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DONATION_UPDATE_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
