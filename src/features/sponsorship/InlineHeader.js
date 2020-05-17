import React, { Component } from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
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
        <div className="col-4 col-first">
          <span>
            <FormattedMessage id="app.features.sponsorship.list.col.type" defaultMessage="Type" />
          </span>
        </div>
        <div className="col-4 text-right">
          <span>
            <FormattedMessage id="app.features.sponsorship.list.col.amount" defaultMessage="Amount" />
          </span>
        </div>
        <div className="col-4">
          <span>
            <FormattedMessage id="app.features.sponsorship.list.col.from" defaultMessage="From" />
          </span>
        </div>
        <div className="col-4">
          <span>
            <FormattedMessage id="app.features.sponsorship.list.col.to" defaultMessage="To" />
          </span>
        </div>
        <div className="col-8">
          {this.props.mode === 'cause' ? (
            <span>
              <FormattedMessage id="app.features.sponsorship.list.col.client" defaultMessage="Member" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="app.features.sponsorship.list.col.cause" defaultMessage="Mission" />
            </span>
          )}
        </div>
        <div className="col-4">
          <span>
            <FormattedMessage id="app.features.sponsorship.list.col.site" defaultMessage="Show on site" />
          </span>
        </div>
        <div className="col-4">
          <span>
            <FormattedMessage id="app.features.sponsorship.list.col.news" defaultMessage="News" />
          </span>
        </div>
        <div className="col-4 text-right col-last">
          <div className="btn-group btn-group-xs" role="group" aria-label="...">
            <button
              type="button"
              className="btn btn-inline btn-primary"
              onClick={this.props.onAddOne}
            >
              <AddOneIcon className="inline-action text-light" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
