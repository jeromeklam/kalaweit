import {
  RECEIPT_SET_SORT,
} from '../../../../src/features/receipt/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/receipt/redux/setSort';

describe('receipt/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', RECEIPT_SET_SORT);
  });

  it('handles action type RECEIPT_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: RECEIPT_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
