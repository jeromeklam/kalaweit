import {
  PAYMENT_TYPE_SET_SORT,
} from '../../../../src/features/payment-type/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/payment-type/redux/setSort';

describe('payment-type/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', PAYMENT_TYPE_SET_SORT);
  });

  it('handles action type PAYMENT_TYPE_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PAYMENT_TYPE_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
