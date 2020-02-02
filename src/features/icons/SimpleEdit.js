import React, { Component } from 'react';
import { mdiPencil as myIcon } from '@mdi/js';
import { Icon } from './';

export default class SimpleEdit extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
