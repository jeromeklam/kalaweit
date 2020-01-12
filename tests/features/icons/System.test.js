import React from 'react';
import { shallow } from 'enzyme';
import { System } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<System />);
  expect(renderedComponent.find('.icons-system').length).toBe(1);
});
