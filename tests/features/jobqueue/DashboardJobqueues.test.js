import React from 'react';
import { shallow } from 'enzyme';
import { DashboardJobqueues } from '../../../src/features/jobqueue/DashboardJobqueues';

describe('jobqueue/DashboardJobqueues', () => {
  it('renders node with correct class name', () => {
    const props = {
      jobqueue: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DashboardJobqueues {...props} />
    );

    expect(
      renderedComponent.find('.jobqueue-dashboard-jobqueues').length
    ).toBe(1);
  });
});
