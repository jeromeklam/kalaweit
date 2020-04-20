import React from 'react';
import { shallow } from 'enzyme';
import { Certificate } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Certificate />);
  expect(renderedComponent.find('.icons-certificate').length).toBe(1);
});
