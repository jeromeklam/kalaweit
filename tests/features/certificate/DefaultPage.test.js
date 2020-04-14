import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/certificate/DefaultPage';

describe('certificate/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      certificate: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.certificate-default-page').length
    ).toBe(1);
  });
});
