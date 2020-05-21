import React from 'react';
import { shallow } from 'enzyme';
import { LockOn } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LockOn />);
  expect(renderedComponent.find('.icons-lock-on').length).toBe(1);
});
