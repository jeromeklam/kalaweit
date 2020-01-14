import React from 'react';
import { shallow } from 'enzyme';
import { InlineSponsorships } from '../../../src/features/sponsorship/InlineSponsorships';

describe('sponsorship/InlineSponsorships', () => {
  it('renders node with correct class name', () => {
    const props = {
      sponsorship: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineSponsorships {...props} />
    );

    expect(
      renderedComponent.find('.sponsorship-inline-sponsorships').length
    ).toBe(1);
  });
});
