import React from 'react';
import { shallow } from 'enzyme';
import { Copyright } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Copyright />);
  expect(renderedComponent.find('.common-copyright').length).toBe(1);
});
