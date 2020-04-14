import React from 'react';
import { shallow } from 'enzyme';
import { ModifyOrCreateMedia } from '../../../src/features/cause/ModifyOrCreateMedia';

describe('cause/ModifyOrCreateMedia', () => {
  it('renders node with correct class name', () => {
    const props = {
      cause: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ModifyOrCreateMedia {...props} />
    );

    expect(
      renderedComponent.find('.cause-modify-or-create-media').length
    ).toBe(1);
  });
});
