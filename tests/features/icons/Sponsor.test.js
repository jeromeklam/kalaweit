import React from 'react';
import { shallow } from 'enzyme';
import { Sponsor } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Sponsor />);
  expect(renderedComponent.find('.icons-sponsor').length).toBe(1);
});
