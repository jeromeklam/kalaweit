import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveConfirm } from 'freeassofront';
import { intlDate } from '../../common';
import { getPaymentTypeLabel } from '../payment-type';
import { getFullName } from '../client';
import { SimpleEdit as SimpleEditIcon, DelOne as DelOneIcon } from '../icons';

export default class InlineLine extends Component {
  static propTypes = {
    sponsorship: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
    };
    this.onConfirmRemove = this.onConfirmRemove.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
  }

  onConfirmRemove() {
    this.setState({ confirm: true });
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
          <div className="btn-group btn-group-sm" role="group" aria-label="...">
            <div className="btn-group" role="group" aria-label="First group">
              <div className="ml-2">
                <SimpleEditIcon
                  onClick={() => this.props.onEdit(sponsorship.id)}
                  className="text-secondary inline-action"
                />
                <DelOneIcon
                  onClick={() => this.onConfirmRemove(sponsorship.id)}
                  className="text-warning inline-action"
                />
              </div>
            </div>
          </div>
        </div>
        <ResponsiveConfirm
          show={this.state.confirm}
          onClose={this.onConfirmClose}
          onConfirm={() => {
            this.onDelete(sponsorship.id);
          }}
        />
      </div>
    );
  }
}
