import {
  EMAIL_INIT_SORT,
} from '../../../../src/features/email/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/email/redux/initSort';

describe('email/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', EMAIL_INIT_SORT);
  });

  it('handles action type EMAIL_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EMAIL_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
