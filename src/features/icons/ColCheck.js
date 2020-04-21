import React, { Component } from 'react';
import { Icon } from './';
import {
  mdiCheck as myIcon
} from '@mdi/js';

export default class Check extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={myIcon}
        size={1}
        {...this.props}
      />
    );
  }
}
