import {
  AUTH_SET_REALM,
} from '../../../../src/features/auth/redux/constants';

import {
  setRealm,
  reducer,
} from '../../../../src/features/auth/redux/setRealm';

describe('auth/redux/setRealm', () => {
  it('returns correct action by setRealm', () => {
    expect(setRealm()).toHaveProperty('type', AUTH_SET_REALM);
  });

  it('handles action type AUTH_SET_REALM correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTH_SET_REALM }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
