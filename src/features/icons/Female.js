import React, { Component } from 'react';
import { mdiGenderFemale as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Female extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
