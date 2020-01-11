import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/donation/Create';

describe('donation/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      donation: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.donation-create').length
    ).toBe(1);
  });
});
