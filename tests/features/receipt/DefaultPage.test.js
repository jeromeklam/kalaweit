import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/receipt/DefaultPage';

describe('receipt/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      receipt: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.receipt-default-page').length
    ).toBe(1);
  });
});
