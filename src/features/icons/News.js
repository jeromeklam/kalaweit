import React, { Component } from 'react';
import { mdiBookInformationVariant as myIcon } from '@mdi/js';
import { Icon } from './';

export default class News extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
