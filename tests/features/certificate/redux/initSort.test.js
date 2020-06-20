import {
  CERTIFICATE_INIT_SORT,
} from '../../../../src/features/certificate/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/certificate/redux/initSort';

describe('certificate/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', CERTIFICATE_INIT_SORT);
  });

  it('handles action type CERTIFICATE_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CERTIFICATE_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
