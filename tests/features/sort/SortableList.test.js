import React from 'react';
import { shallow } from 'enzyme';
import { SortableList } from '../../../src/features/sort';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SortableList />);
  expect(renderedComponent.find('.sort-sortable-list').length).toBe(1);
});
