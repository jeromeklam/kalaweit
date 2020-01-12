import React, { Component } from 'react';
import { Icon } from './';
import {
  mdiEye
} from '@mdi/js';

export default class View extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiEye}
        size={1}
        {...this.props}
      />
    );
  }
}
