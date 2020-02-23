import React, { Component } from 'react';
import { Icon } from './';
import { mdiAccountCash as myIcon } from '@mdi/js';

export default class Donation extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
