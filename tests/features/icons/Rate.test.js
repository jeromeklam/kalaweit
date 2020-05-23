import React from 'react';
import { shallow } from 'enzyme';
import { Rate } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Rate />);
  expect(renderedComponent.find('.icons-rate').length).toBe(1);
});
