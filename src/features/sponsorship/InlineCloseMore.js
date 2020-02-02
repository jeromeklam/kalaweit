import React, { Component } from 'react';
import { ColLink } from '../ui';

export default class InlineCloseMore extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="row row-line">
        <ColLink
          label="Cacher les dons et parrainages terminés"
          className="text-primary"
          {...this.props}
        />
      </div>
    );
  }
}
