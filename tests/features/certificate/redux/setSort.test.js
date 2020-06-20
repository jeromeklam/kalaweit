import {
  CERTIFICATE_SET_SORT,
} from '../../../../src/features/certificate/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/certificate/redux/setSort';

describe('certificate/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', CERTIFICATE_SET_SORT);
  });

  it('handles action type CERTIFICATE_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CERTIFICATE_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
