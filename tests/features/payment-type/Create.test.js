import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/payment-type/Create';

describe('payment-type/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      paymentType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.payment-type-create').length
    ).toBe(1);
  });
});
