import React, { Component } from 'react';
import { Icon } from './';
import { mdiAccountHeart as myIcon } from '@mdi/js';

export default class Sponsor extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} color={this.props.color} />;
  }
}
