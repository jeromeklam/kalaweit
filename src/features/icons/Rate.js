import React, { Component } from 'react';
import { mdiBank as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Rate extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
