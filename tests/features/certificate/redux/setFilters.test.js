import {
  CERTIFICATE_SET_FILTERS,
} from '../../../../src/features/certificate/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/certificate/redux/setFilters';

describe('certificate/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', CERTIFICATE_SET_FILTERS);
  });

  it('handles action type CERTIFICATE_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CERTIFICATE_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
