import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiCamera } from '@mdi/js';

export default class GetPhoto extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiCamera} size={1} color={this.props.color} />;
  }
}
