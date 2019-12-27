import React from 'react';
import { shallow } from 'enzyme';
import { Clear } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Clear />);
  expect(renderedComponent.find('.icons-clear').length).toBe(1);
});
