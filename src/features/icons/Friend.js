import React, { Component } from 'react';
import { Icon } from './';
import { mdiAccountHeart } from '@mdi/js';

export default class Friend extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiAccountHeart} {...this.props} />;
  }
}
