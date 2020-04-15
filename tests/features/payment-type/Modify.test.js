import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/payment-type/Modify';

describe('payment-type/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      paymentType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.payment-type-modify').length
    ).toBe(1);
  });
});
