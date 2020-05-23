import React, { Component } from 'react';
import { mdiSwapHorizontalBold as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Swap extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
