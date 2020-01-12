import React, { Component } from 'react';
import { Icon } from './';
import {
  mdiRadioboxBlank as myIcon
} from '@mdi/js';

export default class Unchecked extends Component {
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
