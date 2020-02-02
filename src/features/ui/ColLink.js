import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class ColLink extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: 'text-secondary',
    label: 'Plus',
    onClick: () => {}
  };

  render() {
    return (
      <div
        className={classnames('col-36 col-link text-center mt-3 mb-3', this.props.className)}
        onClick={this.props.onClick}
      >
        <span>{this.props.label}</span>
      </div>
    );
  }
}
