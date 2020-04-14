import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/money/DefaultPage';

describe('money/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      money: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.money-default-page').length
    ).toBe(1);
  });
});
