import {
  DONATION_CLEAR_ITEMS,
} from '../../../../src/features/donation/redux/constants';

import {
  clearItems,
  reducer,
} from '../../../../src/features/donation/redux/clearItems';

describe('donation/redux/clearItems', () => {
  it('returns correct action by clearItems', () => {
    expect(clearItems()).toHaveProperty('type', DONATION_CLEAR_ITEMS);
  });

  it('handles action type DONATION_CLEAR_ITEMS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DONATION_CLEAR_ITEMS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
