import React, { Component } from 'react';
import { Icon } from './';
import { mdiCurrencyEurOff as myMdi } from '@mdi/js';

export default class PaymentOff extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myMdi} color={this.props.color} />;
  }
}
