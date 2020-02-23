import React, { Component } from 'react';
import { Icon } from './';
import { mdiDelete } from '@mdi/js';

export default class DelOne extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiDelete} {...this.props} />;
  }
}
