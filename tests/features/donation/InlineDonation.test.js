import React from 'react';
import { shallow } from 'enzyme';
import { InlineDonation } from '../../../src/features/donation';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineDonation />);
  expect(renderedComponent.find('.donation-inline-donation').length).toBe(1);
});
