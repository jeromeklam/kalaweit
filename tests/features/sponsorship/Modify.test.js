import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/sponsorship/Modify';

describe('sponsorship/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      sponsorship: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.sponsorship-modify').length
    ).toBe(1);
  });
});
