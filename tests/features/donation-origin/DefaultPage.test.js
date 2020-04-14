import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/donation-origin/DefaultPage';

describe('donation-origin/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      donationOrigin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.donation-origin-default-page').length
    ).toBe(1);
  });
});
