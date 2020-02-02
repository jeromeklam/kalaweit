import React, { Component } from 'react';
import classnames from 'classnames';
import { Loading9x9 } from 'freeassofront';

export default class CenteredLoading9X9 extends Component {
  static propTypes = {};

  render() {
    return (
      <div className={classnames('text-center mt-2', this.props.className)}>
        <Loading9x9 />
      </div>
    );
  }
}
