import {
  COMMON_SET_LOCALE,
} from '../../../../src/features/common/redux/constants';

import {
  setLocale,
  reducer,
} from '../../../../src/features/common/redux/setLocale';

describe('common/redux/setLocale', () => {
  it('returns correct action by setLocale', () => {
    expect(setLocale()).toHaveProperty('type', COMMON_SET_LOCALE);
  });

  it('handles action type COMMON_SET_LOCALE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SET_LOCALE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
