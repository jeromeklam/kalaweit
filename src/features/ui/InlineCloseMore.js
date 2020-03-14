import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { ColLink } from './';

export default class InlineCloseMore extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div
        className={classnames(
          'row row-line',
          this.props.oddEven % 2 !== 1 ? 'row-odd' : 'row-even',
        )}
      >
        <ColLink
          label={this.props.label}
          className="text-secondary"
          {...this.props}
        />
      </div>
    );
  }
}
