import React, { Component } from 'react';
import { Icon } from './';
import { mdiMinus } from '@mdi/js';

export default class Minus extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiMinus} size={1} {...this.props} />;
  }
}
