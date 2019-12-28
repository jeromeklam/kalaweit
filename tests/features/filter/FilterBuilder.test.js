import React from 'react';
import { shallow } from 'enzyme';
import { FilterBuilder } from '../../../src/features/filter';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FilterBuilder />);
  expect(renderedComponent.find('.filter-filter-builder').length).toBe(1);
});
