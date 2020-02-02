import React from 'react';
import { shallow } from 'enzyme';
import { InlineMore } from '../../../src/features/sponsorship';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineMore />);
  expect(renderedComponent.find('.sponsorship-inline-more').length).toBe(1);
});
