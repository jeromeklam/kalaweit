import React, { Component } from 'react';
import { mdiPaperclip as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Note extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
