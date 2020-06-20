import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/certificate/Create';

describe('certificate/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      certificate: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.certificate-create').length
    ).toBe(1);
  });
});
