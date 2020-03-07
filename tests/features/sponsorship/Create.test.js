import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/sponsorship/Create';

describe('sponsorship/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      sponsorship: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.sponsorship-create').length
    ).toBe(1);
  });
});
