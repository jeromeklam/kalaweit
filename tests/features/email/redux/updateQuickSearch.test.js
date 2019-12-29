import {
  EMAIL_UPDATE_QUICK_SEARCH,
} from '../../../../src/features/email/redux/constants';

import {
  updateQuickSearch,
  reducer,
} from '../../../../src/features/email/redux/updateQuickSearch';

describe('email/redux/updateQuickSearch', () => {
  it('returns correct action by updateQuickSearch', () => {
    expect(updateQuickSearch()).toHaveProperty('type', EMAIL_UPDATE_QUICK_SEARCH);
  });

  it('handles action type EMAIL_UPDATE_QUICK_SEARCH correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EMAIL_UPDATE_QUICK_SEARCH }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
