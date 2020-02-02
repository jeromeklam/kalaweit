import React, { Component } from 'react';
import InlineForm from './InlineForm';

export default class InlineSponsorship extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="row row-line">
        <div className="col-36">
          <InlineForm {...this.props} />
        </div>
      </div>
    );
  }
}
