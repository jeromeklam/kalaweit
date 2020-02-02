import React, { Component } from 'react';
import { ColLink } from '../ui';

export default class InlineEmpty extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="row row-line">
        <ColLink label="Aucun don ou parrainage régulier" />
      </div>
    );
  }
}
