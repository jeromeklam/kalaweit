import React from 'react';
import { shallow } from 'enzyme';
import { InlineEmpty } from '../../../src/features/sponsorship';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineEmpty />);
  expect(renderedComponent.find('.sponsorship-inline-empty').length).toBe(1);
});
