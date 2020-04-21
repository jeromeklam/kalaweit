import {
  RECEIPT_INIT_FILTERS,
} from '../../../../src/features/receipt/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/receipt/redux/initFilters';

describe('receipt/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', RECEIPT_INIT_FILTERS);
  });

  it('handles action type RECEIPT_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: RECEIPT_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
