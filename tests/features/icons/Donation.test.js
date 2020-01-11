import React from 'react';
import { shallow } from 'enzyme';
import { Donation } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Donation />);
  expect(renderedComponent.find('.icons-donation').length).toBe(1);
});
