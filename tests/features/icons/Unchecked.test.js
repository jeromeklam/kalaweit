import React from 'react';
import { shallow } from 'enzyme';
import { Unchecked } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Unchecked />);
  expect(renderedComponent.find('.icons-unchecked').length).toBe(1);
});
