import React from 'react';
import { shallow } from 'enzyme';
import { SimpleEdit } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SimpleEdit />);
  expect(renderedComponent.find('.icons-simple-edit').length).toBe(1);
});
