import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiHandHeart } from '@mdi/js';

export default class Cause extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiHandHeart} size={1} {...this.props} />;
  }
}
