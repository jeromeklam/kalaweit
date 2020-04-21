import React, { Component } from 'react';
import { Icon } from './';
import { mdiAccount as myMdi } from '@mdi/js';

export default class Account extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myMdi} color={this.props.color} />;
  }
}
