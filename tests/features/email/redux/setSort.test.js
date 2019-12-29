import {
  EMAIL_SET_SORT,
} from '../../../../src/features/email/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/email/redux/setSort';

describe('email/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', EMAIL_SET_SORT);
  });

  it('handles action type EMAIL_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EMAIL_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
