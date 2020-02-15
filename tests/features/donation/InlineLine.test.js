import React from 'react';
import { shallow } from 'enzyme';
import { InlineLine } from '../../../src/features/donation';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineLine />);
  expect(renderedComponent.find('.donation-inline-line').length).toBe(1);
});
