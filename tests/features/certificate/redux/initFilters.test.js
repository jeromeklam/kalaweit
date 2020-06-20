import {
  CERTIFICATE_INIT_FILTERS,
} from '../../../../src/features/certificate/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/certificate/redux/initFilters';

describe('certificate/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', CERTIFICATE_INIT_FILTERS);
  });

  it('handles action type CERTIFICATE_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CERTIFICATE_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
