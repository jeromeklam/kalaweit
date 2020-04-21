import React, { Component } from 'react';
import { Icon } from './';
import { mdiFolderHeartOutline as myMdi } from '@mdi/js';

export default class Administrative extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myMdi} {...this.props} />;
  }
}
