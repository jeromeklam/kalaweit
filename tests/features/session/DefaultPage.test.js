import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/session/DefaultPage';

describe('session/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      session: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.session-default-page').length
    ).toBe(1);
  });
});
