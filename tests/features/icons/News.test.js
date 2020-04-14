import React from 'react';
import { shallow } from 'enzyme';
import { News } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<News />);
  expect(renderedComponent.find('.icons-news').length).toBe(1);
});
