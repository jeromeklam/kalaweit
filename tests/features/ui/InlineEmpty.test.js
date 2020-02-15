import React from 'react';
import { shallow } from 'enzyme';
import { InlineEmpty } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineEmpty />);
  expect(renderedComponent.find('.ui-inline-empty').length).toBe(1);
});
