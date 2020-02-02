import React from 'react';
import { shallow } from 'enzyme';
import { ColLink } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ColLink />);
  expect(renderedComponent.find('.ui-col-link').length).toBe(1);
});
