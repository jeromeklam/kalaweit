import React from 'react';
import { shallow } from 'enzyme';
import { Swap } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Swap />);
  expect(renderedComponent.find('.icons-swap').length).toBe(1);
});
