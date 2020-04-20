import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiCharity as myIcon,
} from '@mdi/js';

export default class Sponsor extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon
        path={myIcon}
        size={1}
        color={this.props.color}
      />
    );
  }
}
