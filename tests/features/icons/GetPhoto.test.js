import React from 'react';
import { shallow } from 'enzyme';
import { GetPhoto } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<GetPhoto />);
  expect(renderedComponent.find('.icons-get-photo').length).toBe(1);
});
