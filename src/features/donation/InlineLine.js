import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveConfirm } from 'freeassofront';
import { intlDate } from '../../common';
import { getPaymentTypeLabel } from '../payment-type';
import { getFullName } from '../client';
import {
  GetOne as GetOneIcon,
  DelOne as DelOneIcon, 
} from '../icons';
import { Modify } from './';

export default class InlineLine extends Component {
  static propTypes = {
    donation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      don_id: -1,
      donation: props.donation,
    };
    this.onConfirm = this.onConfirm.bind(this);
    this.onConfirmOpen = this.onConfirmOpen.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
  }

  componentDidMount() {
    if (!this.props.donation.emptyItem) {
      this.props.actions.loadOne(0);
    }
  }

  onGetOne(id) {
    this.setState({ don_id: id });
  }

  onClose() {
    this.setState({ don_id: -1 });
  }

  onConfirmOpen(id) {
    this.setState({ confirm: true, don_id: id });
  }

  onConfirm(id) {
    const { don_id, donation } = this.state;
    this.setState({ confirm: false, don_id: -1 });
    this.props.actions.delOne(don_id).then(result => {
      this.props.actions.loadDonations(donation);
    });
  }

  onConfirmClose() {
    this.setState({ confirm: false });
  }

  render() {
    const { donation, paymentTypes } = this.props;
    return (
      <div className="row row-line" key={donation.id}>
        <div className="col-5">
          <span>{donation.don_mnt}</span>
        </div>
        <div className="col-5">
          <span>{getPaymentTypeLabel(paymentTypes, donation.payment_type.id)}</span>
        </div>
        <div className="col-6">
          <span>{intlDate(donation.don_ask_ts)}</span>
        </div>
        <div className="col-8">
          {this.props.mode === 'cause' ? (
            <span>{getFullName(donation.client)}</span>
          ) : (
            <span>{donation.cause.cau_name}</span>
          )}
        </div>
        <div className="col-12 text-right">
          <div className="btn-group btn-group-xs" role="group" aria-label="...">
            <button
              type="button"
              className="btn btn-inline btn-secondary"
              onClick={() => {this.onGetOne(donation.id)}}
            >
              <GetOneIcon className="inline-action text-light" />
            </button>
            <button
              type="button"
              className="btn btn-inline btn-warning"
              onClick={() => this.onConfirmOpen(donation.id)}
            >
              <DelOneIcon className="inline-action text-light" />
            </button>
          </div>
        </div>
        <ResponsiveConfirm
          show={this.state.confirm}
          onClose={this.onConfirmClose}
          onConfirm={() => {
          this.onConfirm();
          }}
        />
        {!this.state.confirm && this.state.don_id > 0 && (
          <Modify onClose={this.onClose} don_id={this.state.don_id} donation={this.state.donation} />
        )}
      </div>
    );
  }
}
