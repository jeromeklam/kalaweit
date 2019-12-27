import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiClose
} from '@mdi/js';

export default class Clear extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiClose}
        size={1}
        {...this.props}
      />
    );
  }
}
