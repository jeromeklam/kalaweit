import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/payment-type/List';

describe('payment-type/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      paymentType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.payment-type-list').length
    ).toBe(1);
  });
});
