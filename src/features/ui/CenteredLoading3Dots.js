import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading3Dots } from 'freeassofront';

export default class CenteredLoading3Dots extends Component {
  static propTypes = {
    show: PropTypes.bool,
  };
  static defaultProps = {
    show: true,
  };

  render() {
    if (this.props.show) {
      return (
        <div className="ui-centered-loading-3-dots text-center mt-2 mb-2 text-primary">
          <Loading3Dots />
        </div>
      );
    }
    return null;
  }
}
