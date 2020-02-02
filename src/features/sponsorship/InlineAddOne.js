import React, { Component } from 'react';
import { ColLink } from '../ui';

export default class InlineAddOne extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="row row-line">
        <ColLink
          label="Ajouter un don ou parrainage régulier"
          className="text-primary"
          {...this.props}
        />
      </div>
    );
  }
}
