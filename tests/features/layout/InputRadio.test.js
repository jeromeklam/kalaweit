import React from 'react';
import { shallow } from 'enzyme';
import { InputRadio } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputRadio />);
  expect(renderedComponent.find('.layout-input-radio').length).toBe(1);
});
