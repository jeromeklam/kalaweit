import React from 'react';
import { shallow } from 'enzyme';
import { CauseDonation } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CauseDonation />);
  expect(renderedComponent.find('.icons-cause-donation').length).toBe(1);
});
