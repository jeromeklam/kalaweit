import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/receipt/Create';

describe('receipt/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      receipt: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.receipt-create').length
    ).toBe(1);
  });
});
