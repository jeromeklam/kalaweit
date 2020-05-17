import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { ResponsiveConfirm } from 'freeassofront';
import { CenteredLoading3Dots } from '../ui';
import {
  deleteSuccess,
  showErrors,
  InlineAddOne,
  InlineCloseMore,
  InlineEmpty,
  InlineMore,
} from '../ui';
import { inTheFuture, propagateModel } from '../../common';
import { InlineHeader, InlineLine, Create, Modify } from './';

export class InlineDonations extends Component {
  static propTypes = {
    donation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    let filters = {};
    if (props.mode === 'cause') {
      filters = { cau_id: { eq: props.id } };
    } else {
      filters = { cli_id: { eq: props.id } };
    }
    this.state = {
      confirm: -1,
      filters: filters,
      more: false,
      donId: -1,
    };
    this.onMore = this.onMore.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onCloseForm = this.onCloseForm.bind(this);
    this.onModify = this.onModify.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadDonations(this.state.filters, true);
  }

  onMore() {
    this.setState({ more: !this.state.more });
  }

  onAdd() {
    this.setState({ donId: 0 });
  }

  onModify(id) {
    this.setState({ donId: id });
  }

  onConfirm(id) {
    this.setState({ confirm: id });
  }

  onConfirmClose() {
    this.setState({ confirm: -1 });
  }

  onDelete(id) {
    this.props.actions
      .delOne(id)
      .then(result => {
        deleteSuccess();
        let filters = {};
        if (this.props.mode === 'cause') {
          filters = { cau_id: this.props.id };
        } else {
          filters = { cli_id: this.props.id };
        }
        this.setState({ add: false, donId: -1 });
        this.props.actions.loadDonations(filters);
      })
      .catch(errors => {
        showErrors(this.props.intl, errors);
      });
  }

  onCloseForm() {
    this.setState({ donId: -1 });
    this.props.actions.loadDonations(this.state.filters);
  }

  render() {
    const { intl } = this.props;
    const donations = this.props.donation.donationsModels;
    let others = false;
    let counter = 0;
    return (
      <div>
        <div className="donation-inline-donations">
          {this.props.donation.loadDonationsPending ? (
            <CenteredLoading3Dots />
          ) : (
            <div className="cause-inline-sponsorships">
              <div className="inline-list">
                {donations.length > 0 && (
                  <InlineHeader {...this.props} oddEven={counter++} onAddOne={this.onAdd} />
                )}
                {donations.length > 0 &&
                  donations.map(donation => {
                    return (
                      <InlineLine
                        {...this.props}
                        oddEven={counter++}
                        key={donation.id}
                        donation={donation}
                        paymentTypes={this.props.paymentType.items}
                        onGetOne={this.onModify}
                        onDelOne={this.onConfirm}
                      />
                    );
                  })}
                {others &&
                  (this.state.more ? (
                    donations.map(donation => {
                      if (!inTheFuture(donation.don_ts)) {
                        return (
                          <InlineLine
                            {...this.props}
                            oddEven={counter++}
                            key={donation.id}
                            sponsorship={donation}
                            paymentTypes={this.props.paymentType.items}
                            onGetOne={this.onModify}
                            onDelOne={this.onConfirm}
                          />
                        );
                      }
                      return null;
                    })
                  ) : (
                    <InlineMore
                      oddEven={counter++}
                      label={intl.formatMessage({
                        id: 'app.features.donation.list.displayFinished',
                        defaultMessage: 'Display finished donation(s)',
                      })}
                      onClick={this.onMore}
                    />
                  ))}
                {others && this.state.more && (
                  <InlineCloseMore
                    oddEven={counter++}
                    label={intl.formatMessage({
                      id: 'app.features.donation.list.hideFinished',
                      defaultMessage: 'Hide finished donation(s)',
                    })}
                    onClick={this.onMore}
                  />
                )}
                {!this.state.add && donations.length <= 0 && <InlineEmpty label="Aucun don" />}
                <InlineAddOne
                  oddEven={counter++}
                  label={intl.formatMessage({
                    id: 'app.features.donation.list.addDonation',
                    defaultMessage: 'Add one donation',
                  })}
                  onClick={this.onAdd}
                />
                {this.state.donId > 0 && (
                  <Modify
                    donId={this.state.donId}
                    mode={this.props.mode}
                    parentId={this.props.id}
                    onClose={this.onCloseForm}
                  />
                )}
                {this.state.donId === 0 && (
                  <Create
                    donId={this.state.donId}
                    mode={this.props.mode}
                    parentId={this.props.id}
                    onClose={this.onCloseForm}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        {this.state.confirm > 0 && (
          <ResponsiveConfirm
            show={this.state.confirm}
            onClose={this.onConfirmClose}
            onConfirm={() => {
              this.onDelete(this.state.confirm);
            }}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    donation: state.donation,
    paymentType: state.paymentType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(InlineDonations));
