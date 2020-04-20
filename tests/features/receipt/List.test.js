import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/receipt/List';

describe('receipt/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      receipt: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.receipt-list').length
    ).toBe(1);
  });
});
