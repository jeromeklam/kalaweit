import React, { Component } from 'react';
import { Loading3Dots } from 'freeassofront';

export default class CenteredLoading3Dots extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="ui-centered-loading-3-dots">
        <Loading3Dots />
      </div>
    );
  }
}
