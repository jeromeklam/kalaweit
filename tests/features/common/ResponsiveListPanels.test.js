import React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveListPanels } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ResponsiveListPanels />);
  expect(renderedComponent.find('.common-responsive-list-panels').length).toBe(1);
});
