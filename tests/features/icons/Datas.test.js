import React from 'react';
import { shallow } from 'enzyme';
import { Datas } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Datas />);
  expect(renderedComponent.find('.icons-datas').length).toBe(1);
});
