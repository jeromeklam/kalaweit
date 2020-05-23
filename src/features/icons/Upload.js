import React, { Component } from 'react';
import { Icon } from './';
import { mdiCloudUpload } from '@mdi/js';

export default class Upload extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiCloudUpload} size={1} {...this.props} />;
  }
}
