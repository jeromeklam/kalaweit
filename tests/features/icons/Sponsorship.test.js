import React from 'react';
import { shallow } from 'enzyme';
import { Sponsorship } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Sponsorship />);
  expect(renderedComponent.find('.icons-sponsorship').length).toBe(1);
});
