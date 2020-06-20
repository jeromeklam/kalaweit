import React, { Component } from 'react';
import { Icon } from './';
import { mdiMagnify } from '@mdi/js';

export default class Plus extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiMagnify} {...this.props} />;
  }
}
