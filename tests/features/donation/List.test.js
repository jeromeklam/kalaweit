import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/donation/List';

describe('donation/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      donation: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.donation-list').length
    ).toBe(1);
  });
});
