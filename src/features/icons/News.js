import React, { Component } from 'react';
import { mdiNewspaper as myIcon } from '@mdi/js';
import { Icon } from './';

export default class News extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
