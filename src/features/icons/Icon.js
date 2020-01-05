import React, { Component } from 'react';
import { Icon as ReactIcon } from '@mdi/react';

export default class Icon extends Component {
  static propTypes = {

  };

  render() {
    return (
      <ReactIcon {...this.props} />
    );
  }
}
