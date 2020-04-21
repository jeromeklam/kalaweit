import React, { Component } from 'react';
import { Icon } from './';
import { mdiAccountMultiple as myMdi } from '@mdi/js';

export default class Person extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myMdi} {...this.props} />;
  }
}
