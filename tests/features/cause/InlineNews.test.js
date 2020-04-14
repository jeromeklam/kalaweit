import React from 'react';
import { shallow } from 'enzyme';
import { InlineNews } from '../../../src/features/cause/InlineNews';

describe('cause/InlineNews', () => {
  it('renders node with correct class name', () => {
    const props = {
      cause: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineNews {...props} />
    );

    expect(
      renderedComponent.find('.cause-inline-news').length
    ).toBe(1);
  });
});
