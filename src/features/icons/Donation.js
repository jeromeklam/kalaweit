import React, { Component } from 'react';
import { Icon } from './';
import {
  mdiCash
} from '@mdi/js';

export default class Donation extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiCash}
        size={1}
        {...this.props}
      />
    );
  }
}
