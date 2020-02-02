import React, { Component } from 'react';
import { ColLink } from '../ui';

export default class InlineMore extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="row row-line">
        <ColLink
          label="Afficher tous les dons et parrainages"
          className="text-secondary"
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}
