import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ColLink } from './';

export default class InlineEmpty extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="row row-line">
        <ColLink label={this.props.label} className="text-secondary" />
      </div>
    );
  }
}
