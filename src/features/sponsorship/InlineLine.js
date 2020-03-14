import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { HoverObserver, ResponsiveConfirm } from 'freeassofront';
import { intlDate } from '../../common';
import { getPaymentTypeLabel } from '../payment-type';
import { getFullName } from '../client';
import { GetOne as GetOneIcon, DelOne as DelOneIcon } from '../icons';
import { Modify } from './';

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
        <div className={classnames('row row-line', (this.props.oddEven % 2 !== 1) ? 'row-odd' : 'row-even')} key={sponsorship.id}>
          <div className="col-5">
            <span>{sponsorship.spo_mnt}</span>
          </div>
          <div className="col-5">
            <span>{getPaymentTypeLabel(paymentTypes, sponsorship.payment_type.id)}</span>
          </div>
          <div className="col-6">
            <span>{intlDate(sponsorship.spo_from)}</span>
          </div>
          <div className="col-6">
            <span>{intlDate(sponsorship.spo_to)}</span>
          </div>
          <div className="col-8">
            {this.props.mode === 'cause' ? (
              <span>{getFullName(sponsorship.client)}</span>
            ) : (
              <span>{sponsorship.cause.cau_name}</span>
            )}
          </div>
          <div className="col-6 text-right">
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
        </HoverObserver>

        <ResponsiveConfirm
          show={this.state.confirm}
          onClose={this.onConfirmClose}
          onConfirm={() => {
            this.onConfirm();
          }}
        />
        {!this.state.confirm && this.state.spo_id > 0 && (
          <Modify
            mode={this.props.mode}
            onClose={this.onClose}
            spo_id={this.state.spo_id}
            sponsorship={this.state.sponsorship}
            paymentTypes={this.state.paymentTypes}
          />
        )}
      </div>
    );
  }
}
