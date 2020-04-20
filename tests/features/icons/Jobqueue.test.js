import React from 'react';
import { shallow } from 'enzyme';
import { Jobqueue } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Jobqueue />);
  expect(renderedComponent.find('.icons-jobqueue').length).toBe(1);
});
