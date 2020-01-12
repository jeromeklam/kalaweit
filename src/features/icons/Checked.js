import React, { Component } from 'react';
import { Icon } from './';
import {
  mdiRadioboxMarked as myIcon
} from '@mdi/js';

export default class Checked extends Component {
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
