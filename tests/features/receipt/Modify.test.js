import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/receipt/Modify';

describe('receipt/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      receipt: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.receipt-modify').length
    ).toBe(1);
  });
});
