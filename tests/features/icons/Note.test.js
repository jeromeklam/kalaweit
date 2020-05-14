import React from 'react';
import { shallow } from 'enzyme';
import { Note } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Note />);
  expect(renderedComponent.find('.icons-note').length).toBe(1);
});
