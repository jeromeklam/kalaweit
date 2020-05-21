import React, { Component } from 'react';
import { Icon } from './';
import { mdiLock as myIcon } from '@mdi/js';

export default class LockOn extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
