import React, { Component } from 'react';
import classnames from 'classnames';
import { AddOne as AddOneIcon } from '../icons';

export default class InlineHeader extends Component {
  static propTypes = {};

  render() {
    return (
      <div
        className={classnames(
          'row row-title row-line',
          this.props.oddEven % 2 !== 1 ? 'row-odd' : 'row-even',
        )}
      >
        <div className="col-5">
          <span>Montant</span>
        </div>
        <div className="col-5">
          <span>Type</span>
        </div>
        <div className="col-6">
          <span>Du</span>
        </div>
        <div className="col-8">
          {this.props.mode === 'cause' ? <span>Membre</span> : <span>Cause</span>}
        </div>
        <div className="col-12 text-right">
          <div className="btn-group btn-group-xs" role="group" aria-label="...">
            <button type="button" className="btn btn-inline btn-primary" onClick={this.props.onAddOne}>
              <AddOneIcon className="inline-action text-light" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
