import React from 'react';
import { shallow } from 'enzyme';
import { ButtonFilterClear } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonFilterClear />);
  expect(renderedComponent.find('.layout-button-filter-clear').length).toBe(1);
});
