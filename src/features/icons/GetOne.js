import React, { Component } from 'react';
import { Icon }  from './';
import {
  mdiPencil
} from '@mdi/js';

export default class GetOne extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiPencil}
        size={1}
        {...this.props}
      />
    );
  }
}
