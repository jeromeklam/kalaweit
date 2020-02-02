import React from 'react';
import { shallow } from 'enzyme';
import { InlineCloseMore } from '../../../src/features/sponsorship';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineCloseMore />);
  expect(renderedComponent.find('.sponsorship-inline-close-more').length).toBe(1);
});
