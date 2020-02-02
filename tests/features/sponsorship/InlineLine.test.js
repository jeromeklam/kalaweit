import React from 'react';
import { shallow } from 'enzyme';
import { InlineLine } from '../../../src/features/sponsorship';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineLine />);
  expect(renderedComponent.find('.sponsorship-inline-line').length).toBe(1);
});
