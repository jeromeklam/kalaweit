import {
  RECEIPT_SET_FILTERS,
} from '../../../../src/features/receipt/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/receipt/redux/setFilters';

describe('receipt/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', RECEIPT_SET_FILTERS);
  });

  it('handles action type RECEIPT_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: RECEIPT_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
