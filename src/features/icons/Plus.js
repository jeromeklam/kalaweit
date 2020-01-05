import React, { Component } from 'react';
import { Icon } from './';
import { mdiPlus } from '@mdi/js';

export default class Plus extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiPlus} size={1} {...this.props} />;
  }
}
