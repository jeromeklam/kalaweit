import React from 'react';
import { shallow } from 'enzyme';
import { InlineAddOne } from '../../../src/features/sponsorship';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineAddOne />);
  expect(renderedComponent.find('.sponsorship-inline-add-one').length).toBe(1);
});
