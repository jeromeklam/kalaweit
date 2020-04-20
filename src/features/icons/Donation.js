import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiAccountCash } from '@mdi/js';

export default class Donation extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiAccountCash} size={1} color={this.props.color} />;
  }
}
