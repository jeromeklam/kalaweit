import React, { Component } from 'react';
import { Icon } from './';
import { mdiCalendar } from '@mdi/js';

export default class Calendar extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiCalendar} size={1} {...this.props} />;
  }
}
