import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { HoverObserver, displayDate, displayMonetary, displayBool } from 'freeassofront';
import { getPaymentTypeLabel } from '../payment-type';
import { getFullName } from '../client';
import { GetOne as GetOneIcon, DelOne as DelOneIcon } from '../icons';
import { Modify } from './';

export default class InlineLine extends Component {
  static propTypes = {
    donation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      confirm: false,
      don_id: -1,
      donation: props.donation,
      paymentTypes: props.paymentTypes,
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
    const { donation, paymentTypes } = this.props;
    const highlight = this.state.flipped || this.props.inlineOpenedId === this.props.id;
    console.log(donation);
    return (
      <HoverObserver onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <div
          className={classnames(
            'row row-line',
            this.props.oddEven % 2 !== 1 ? 'row-odd' : 'row-even',
          )}
          key={donation.id}
        >
          <div className="col-4 col-first">
            <span>{getPaymentTypeLabel(paymentTypes, donation.payment_type.id)}</span>
          </div>
          <div className="col-4 text-right">
            <span>{displayMonetary(donation.don_mnt)}</span>
          </div>
          <div className="col-4">
            <span>{displayDate(donation.don_ask_ts)}</span>
          </div>
          <div className="col-4">
            <span>{displayDate(donation.don_end_ts)}</span>
          </div>
          <div className="col-8">
            {this.props.mode === 'cause' ? (
              <span>{getFullName(donation.client)}</span>
            ) : (
              <span>{donation.cause.cau_name}</span>
            )}
          </div>
          <div className="col-4">
            <span>{displayBool(!(donation.sponsorship && donation.sponsorship.id > 0), 'Oui', '')}</span>
          </div>
          <div className="col-8 text-right">
            {highlight && (
              <div className="btn-group btn-group-xs" role="group" aria-label="...">
                <button
                  type="button"
                  className="btn btn-inline btn-secondary"
                  onClick={() => {
                    this.props.onGetOne(donation.id);
                  }}
                >
                  <GetOneIcon className="inline-action text-light" />
                </button>
                <button
                  type="button"
                  className="btn btn-inline btn-warning"
                  onClick={() => this.props.onDelOne(donation.id)}
                >
                  <DelOneIcon className="inline-action text-light" />
                </button>
              </div>
            )}
          </div>
        </div>
      </HoverObserver>
    );
  }
}
