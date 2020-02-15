import React from 'react';
import { shallow } from 'enzyme';
import { InlineAddOne } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineAddOne />);
  expect(renderedComponent.find('.ui-inline-add-one').length).toBe(1);
});
