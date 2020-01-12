import React, { Component } from 'react';
import { Icon } from './';
import {
  mdiSettingsOutline as myIcon
} from '@mdi/js';

export default class System extends Component {
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
