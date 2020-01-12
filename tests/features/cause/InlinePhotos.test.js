import React from 'react';
import { shallow } from 'enzyme';
import { InlinePhotos } from '../../../src/features/cause/InlinePhotos';

describe('cause/InlinePhotos', () => {
  it('renders node with correct class name', () => {
    const props = {
      cause: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlinePhotos {...props} />
    );

    expect(
      renderedComponent.find('.cause-inline-photos').length
    ).toBe(1);
  });
});
