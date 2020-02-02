import React from 'react';
import { shallow } from 'enzyme';
import { InlineSponsorship } from '../../../src/features/sponsorship';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineSponsorship />);
  expect(renderedComponent.find('.sponsorship-inline-sponsorship').length).toBe(1);
});
