import React from 'react';
import { shallow } from 'enzyme';
import { InputMonetary } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputMonetary />);
  expect(renderedComponent.find('.ui-input-monetary').length).toBe(1);
});
