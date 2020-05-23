import React, { Component } from 'react';
import { mdiFileDocument as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Receipt extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
