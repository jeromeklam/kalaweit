import React from 'react';
import { shallow } from 'enzyme';
import { Form } from '../../../src/features/cause';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Form />);
  expect(renderedComponent.find('.cause-form').length).toBe(1);
});
