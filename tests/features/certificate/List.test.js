import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/certificate/List';

describe('certificate/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      certificate: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.certificate-list').length
    ).toBe(1);
  });
});
