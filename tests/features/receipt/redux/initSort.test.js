import {
  RECEIPT_INIT_SORT,
} from '../../../../src/features/receipt/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/receipt/redux/initSort';

describe('receipt/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', RECEIPT_INIT_SORT);
  });

  it('handles action type RECEIPT_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: RECEIPT_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
