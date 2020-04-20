import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiCash } from '@mdi/js';

export default class CauseDonation extends Component {
  static propTypes = {};

  render() {
    return (
      <Icon 
        path={mdiCash} 
        size={1} 
        rotate={90}
        {...this.props} 
      />
    );
  }
}
