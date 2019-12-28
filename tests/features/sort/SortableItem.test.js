import React from 'react';
import { shallow } from 'enzyme';
import { SortableItem } from '../../../src/features/sort';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SortableItem />);
  expect(renderedComponent.find('.sort-sortable-item').length).toBe(1);
});
