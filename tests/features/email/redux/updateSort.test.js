import {
  EMAIL_UPDATE_SORT,
} from '../../../../src/features/email/redux/constants';

import {
  updateSort,
  reducer,
} from '../../../../src/features/email/redux/updateSort';

describe('email/redux/updateSort', () => {
  it('returns correct action by updateSort', () => {
    expect(updateSort()).toHaveProperty('type', EMAIL_UPDATE_SORT);
  });

  it('handles action type EMAIL_UPDATE_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EMAIL_UPDATE_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
