import React, { Component } from 'react';
import { Icon } from './';
import { mdiAccount } from '@mdi/js';

export default class Person extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiAccount} {...this.props} />;
  }
}
