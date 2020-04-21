import React from 'react';
import { shallow } from 'enzyme';
import { Administrative } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Administrative />);
  expect(renderedComponent.find('.icons-administrative').length).toBe(1);
});
