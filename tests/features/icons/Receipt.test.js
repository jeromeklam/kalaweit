import React from 'react';
import { shallow } from 'enzyme';
import { Receipt } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Receipt />);
  expect(renderedComponent.find('.icons-receipt').length).toBe(1);
});
