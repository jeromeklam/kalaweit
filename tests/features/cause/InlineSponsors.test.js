import React from 'react';
import { shallow } from 'enzyme';
import { InlineSponsors } from '../../../src/features/cause/InlineSponsors';

describe('cause/InlineSponsors', () => {
  it('renders node with correct class name', () => {
    const props = {
      cause: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineSponsors {...props} />
    );

    expect(
      renderedComponent.find('.cause-inline-sponsors').length
    ).toBe(1);
  });
});
