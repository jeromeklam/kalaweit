import {
  PAYMENT_TYPE_CLEAR_ITEMS,
} from '../../../../src/features/payment-type/redux/constants';

import {
  clearItems,
  reducer,
} from '../../../../src/features/payment-type/redux/clearItems';

describe('payment-type/redux/clearItems', () => {
  it('returns correct action by clearItems', () => {
    expect(clearItems()).toHaveProperty('type', PAYMENT_TYPE_CLEAR_ITEMS);
  });

  it('handles action type PAYMENT_TYPE_CLEAR_ITEMS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PAYMENT_TYPE_CLEAR_ITEMS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
