import {
  DONATION_INIT_SORT,
} from '../../../../src/features/donation/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/donation/redux/initSort';

describe('donation/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', DONATION_INIT_SORT);
  });

  it('handles action type DONATION_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DONATION_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
