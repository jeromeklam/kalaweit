import React, { Component } from 'react';
import { Icon } from './';
import { mdiLockOpenVariant as myIcon } from '@mdi/js';

export default class LockOff extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
