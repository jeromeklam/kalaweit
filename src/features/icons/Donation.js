import React, { Component } from 'react';
import { Icon } from './';
import { mdiHandHeart as myMdi } from '@mdi/js';

export default class Donation extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myMdi} color={this.props.color} />;
  }
}
