import React, { Component } from 'react';
import { Icon } from './';
import { mdiHandshake as myIcon } from '@mdi/js';

export default class Sponsorship extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
