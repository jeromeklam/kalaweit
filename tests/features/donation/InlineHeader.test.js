import React from 'react';
import { shallow } from 'enzyme';
import { InlineHeader } from '../../../src/features/donation';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineHeader />);
  expect(renderedComponent.find('.donation-inline-header').length).toBe(1);
});
