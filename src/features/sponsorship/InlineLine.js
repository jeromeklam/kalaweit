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
    sponsorship: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      spo_id: -1,      
      sponsorship: props.sponsorship,
      paymentTypes: props.paymentTypes,
    };
    this.onConfirm = this.onConfirm.bind(this);
    this.onConfirmOpen = this.onConfirmOpen.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
  }

  componentDidMount() {
    if (!this.props.sponsorship.emptyItem) {
      this.props.actions.loadOne(0);
    }
  }

  onGetOne(id) {
    this.setState({ spo_id: id });
  }

  onClose() {
    this.setState({ spo_id: -1 });
  }

  onConfirmOpen(id) {
    this.setState({ confirm: true, spo_id: id });
  }

  onConfirm(id) {
    const { spo_id, sponsorship } = this.state;
    this.setState({ confirm: false, spo_id: -1 });
    this.props.actions.delOne(spo_id).then(result => {
      this.props.actions.loadSponsorships(sponsorship);
    });
  }

  onConfirmClose() {
    this.setState({ confirm: false });
  }

  render() {
    const { sponsorship, paymentTypes } = this.props;
    return (
      <div className="row row-line" key={sponsorship.id}>
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
          <div className="btn-group btn-group-xs" role="group" aria-label="...">
            <button
              type="button"
              className="btn btn-inline btn-secondary"
              onClick={() => {this.onGetOne(sponsorship.id)}}
            >
              <GetOneIcon className="inline-action text-light" />
            </button>
            <button
              type="button"
              className="btn btn-inline btn-warning"
              onClick={() => this.onConfirmOpen(sponsorship.id)}
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
        {!this.state.confirm && this.state.spo_id > 0 && (
          <Modify 
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
