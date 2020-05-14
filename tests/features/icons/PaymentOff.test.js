import React from 'react';
import { shallow } from 'enzyme';
import { PaymentOff } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PaymentOff />);
  expect(renderedComponent.find('.icons-payment-off').length).toBe(1);
});
