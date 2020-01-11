import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/donation/Modify';

describe('donation/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      donation: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.donation-modify').length
    ).toBe(1);
  });
});
