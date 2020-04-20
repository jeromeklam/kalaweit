import React, { Component } from 'react';
import { Icon } from './';
import { mdiCalendarClock as myIcon } from '@mdi/js';

export default class Jobqueue extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
