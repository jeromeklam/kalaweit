import React, { Component } from 'react';
import { Icon } from './';
import { mdiDotsHorizontal } from '@mdi/js';

export default class Plus extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiDotsHorizontal} {...this.props} />;
  }
}
