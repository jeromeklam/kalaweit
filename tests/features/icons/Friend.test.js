import React from 'react';
import { shallow } from 'enzyme';
import { Friend } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Friend />);
  expect(renderedComponent.find('.icons-friend').length).toBe(1);
});
