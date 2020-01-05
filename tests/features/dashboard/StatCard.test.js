import React from 'react';
import { shallow } from 'enzyme';
import { StatCard } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<StatCard />);
  expect(renderedComponent.find('.dashboard-stat-card').length).toBe(1);
});
