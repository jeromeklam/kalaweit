import React from 'react';
import { shallow } from 'enzyme';
import { InputSponsors } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputSponsors />);
  expect(renderedComponent.find('.ui-input-sponsors').length).toBe(1);
});
