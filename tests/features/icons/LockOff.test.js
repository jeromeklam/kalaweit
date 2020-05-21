import React from 'react';
import { shallow } from 'enzyme';
import { LockOff } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LockOff />);
  expect(renderedComponent.find('.icons-lock-off').length).toBe(1);
});
