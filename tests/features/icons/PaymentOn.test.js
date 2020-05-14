import React from 'react';
import { shallow } from 'enzyme';
import { PaymentOn } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PaymentOn />);
  expect(renderedComponent.find('.icons-payment-on').length).toBe(1);
});
