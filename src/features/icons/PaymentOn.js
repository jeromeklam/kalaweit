import React, { Component } from 'react';
import { Icon } from './';
import { mdiCurrencyEur as myMdi } from '@mdi/js';

export default class PaymentOn extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myMdi} color={this.props.color} />;
  }
}
