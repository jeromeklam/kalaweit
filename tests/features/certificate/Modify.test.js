import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/certificate/Modify';

describe('certificate/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      certificate: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.certificate-modify').length
    ).toBe(1);
  });
});
