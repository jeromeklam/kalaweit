import React, { Component } from 'react';
import { Icon } from './';
import { mdiDownload } from '@mdi/js';

export default class Download extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiDownload} size={1} {...this.props} />;
  }
}
