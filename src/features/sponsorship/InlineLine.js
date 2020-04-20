import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { HoverObserver, ResponsiveConfirm, displayDate, displayMonetary, displayBool } from 'freeassofront';
import { getPaymentTypeLabel } from '../payment-type';
import { getFullName } from '../client';
import { GetOne as GetOneIcon, DelOne as DelOneIcon } from '../icons';

export default class InlineLine extends Component {
  static propTypes = {
    sponsorship: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
    };
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
  }

  mouseLeave() {
    this.setState({ flipped: false });
  }

  mouseEnter() {
    this.setState({ flipped: true });
  }

  render() {
    const { sponsorship, paymentTypes } = this.props;
    const highlight = this.state.flipped;
    return (
      <HoverObserver onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <div
          className={classnames(
            'row row-line',
            this.props.oddEven % 2 !== 1 ? 'row-odd' : 'row-even',
          )}
          key={sponsorship.id}
        >
          <div className="col-4 col-first">
            <span>{getPaymentTypeLabel(paymentTypes, sponsorship.payment_type.id)}</span>
          </div>
          <div className="col-4 text-right">
            <span>{displayMonetary(sponsorship.spo_mnt, sponsorship.spo_money)}</span>
          </div>
          <div className="col-4">
            <span>{displayDate(sponsorship.spo_from)}</span>
          </div>
          <div className="col-4">
            <span>{displayDate(sponsorship.spo_to)}</span>
          </div>
          <div className="col-10">
            {this.props.mode === 'cause' ? (
              <span>{getFullName(sponsorship.client)}</span>
            ) : (
              <span>{sponsorship.cause.cau_name}</span>
            )}
          </div>
          <div className="col-4">
            <span>{displayBool(sponsorship.spo_display_site)}</span>
          </div>
          <div className="col-4">
            <span>{displayBool(sponsorship.spo_send_news)}</span>
          </div>
          <div className="col-2 text-right col-last">
            {highlight && (
              <div className="btn-group btn-group-xs" role="group" aria-label="...">
                <button
                  type="button"
                  className="btn btn-inline btn-secondary"
                  onClick={() => {
                    this.props.onGetOne(sponsorship.id);
                  }}
                >
                  <GetOneIcon className="inline-action text-light" />
                </button>
                <button
                  type="button"
                  className="btn btn-inline btn-warning"
                  onClick={() => this.props.onDelOne(sponsorship.id)}
                >
                  <DelOneIcon className="inline-action text-light" />
                </button>
              </div>
            )}
          </div>
        </div>
        <ResponsiveConfirm
          show={this.state.confirm}
          onClose={this.onConfirmClose}
          onConfirm={() => {
            this.onConfirm();
          }}
        />
      </HoverObserver>
    );
  }
}
