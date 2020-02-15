import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveConfirm } from 'freeassofront';
import { intlDate } from '../../common';
import { getPaymentTypeLabel } from '../payment-type';
import { getFullName } from '../client';
import { SimpleEdit as SimpleEditIcon, DelOne as DelOneIcon } from '../icons';

export default class InlineLine extends Component {
  static propTypes = {
    donation: PropTypes.object.isRequired,
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
        <div className="col-6 text-right">
          <div className="btn-group btn-group-sm" role="group" aria-label="...">
            <div className="btn-group" role="group" aria-label="First group">
              <div className="ml-2">
                <SimpleEditIcon
                  onClick={() => this.props.onEdit(donation.id)}
                  className="text-secondary inline-action"
                />
                <DelOneIcon
                  onClick={() => this.onConfirmRemove(donation.id)}
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
            this.onConfirmClose();
            this.props.onDelete(donation.id);
          }}
        />
      </div>
    );
  }
}
