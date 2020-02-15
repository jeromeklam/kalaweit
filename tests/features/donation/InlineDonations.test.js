import React from 'react';
import { shallow } from 'enzyme';
import { InlineDonations } from '../../../src/features/donation/InlineDonations';

describe('donation/InlineDonations', () => {
  it('renders node with correct class name', () => {
    const props = {
      donation: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineDonations {...props} />
    );

    expect(
      renderedComponent.find('.donation-inline-donations').length
    ).toBe(1);
  });
});
