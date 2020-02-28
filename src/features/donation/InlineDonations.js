import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel, getJsonApi } from 'freejsonapi';
import { CenteredLoading3Dots } from '../ui';
import {
  createSuccess,
  createError,
  deleteSuccess,
  deleteError,
  modifySuccess,
  modifyError,
  InlineAddOne,
  InlineCloseMore,
  InlineEmpty,
  InlineMore,
} from '../ui';
import { inTheFuture, propagateModel } from '../../common';
import { InlineHeader, InlineLine, InlineDonation } from './';

export class InlineDonations extends Component {
  static propTypes = {
    donation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      more: false,
      add: false,
      modify: 0,
    };
    this.onMore = this.onMore.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onCloseForm = this.onCloseForm.bind(this);
    this.onModify = this.onModify.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmitAdd = this.onSubmitAdd.bind(this);
    this.onSubmitModify = this.onSubmitModify.bind(this);
  }

  componentDidMount() {
    if (!this.props.donation.emptyItem) {
      this.props.actions.loadOne(0);
    }
  }

  onMore() {
    this.setState({ more: !this.state.more });
  }

  onAdd() {
    this.setState({ add: !this.state.add, modify: 0 });
  }

  onSubmitAdd(datas) {
    if (this.state.mode === 'cause') {
      datas.cause.id = this.props.id;
    } else {
      datas.client.id = this.props.id;
    }
    const obj = getJsonApi(datas, 'FreeAsso_Donation', true);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_Donation', result);
        let filters = {};
        if (this.props.mode === 'cause') {
          filters = { cau_id: this.props.id };
        } else {
          filters = { cli_id: this.props.id };
        }
        this.setState({ add: false, modify: 0 });
        this.props.actions.loadDonations(filters);
      })
      .catch(errors => {
        createError();
      });
  }

  onSubmitModify(datas) {
    if (this.state.mode === 'cause') {
      datas.cause.id = this.props.id;
    } else {
      datas.client.id = this.props.id;
    }
    const obj = getJsonApi(datas, 'FreeAsso_Donation', true);
    this.props.actions
      .updateOne(obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_Donation', result);
        let filters = {};
        if (this.props.mode === 'cause') {
          filters = { cau_id: this.props.id };
        } else {
          filters = { cli_id: this.props.id };
        }
        this.setState({ add: false, modify: 0 });
        this.props.actions.loadDonations(filters);
      })
      .catch(errors => {
        modifyError();
      });
  }

  onModify(id) {
    this.setState({ modify: id, add: false });
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
        this.setState({ add: false, modify: 0 });
        this.props.actions.loadDonations(filters);
      })
      .catch(errors => {
        deleteError();
      });
  }

  onCloseForm() {
    this.setState({ add: false, modify: 0 });
  }

  render() {
    const donations = this.props.donation.donationsModels;
    let others = false;
    return (
      <div>
        <div className="donation-inline-donations">
          {this.props.donation.loadDonationsPending ? (
            <div className="text-center">
              <CenteredLoading3Dots className="text-light" />
            </div>
          ) : (
            <div className="cause-inline-sponsorships">
              <div className="inline-list">
                {donations.length > 0 && <InlineHeader {...this.props} />}
                {donations.length > 0 &&
                  donations.map(donation => {
                    if (donation.id !== this.state.modify) {
                      return (
                        <InlineLine
                          {...this.props}
                          key={donation.id}
                          donation={donation}
                          paymentTypes={this.props.paymentType.items}
                          onEdit={this.onModify}
                          onDelete={this.onDelete}
                        />
                      );
                    } else {
                      if (donation.id === this.state.modify) {
                        return (
                          <InlineDonation
                            item={donation}
                            paymentTypes={this.props.paymentType.items}
                            mode={this.props.mode}
                            onSubmit={this.onSubmitModify}
                            onCancel={this.onCloseForm}
                            errors={this.props.sponsorship.updateOneError}
                          />
                        );
                      }
                      others = true;
                    }
                    return null;
                  })}
                {others &&
                  (this.state.more ? (
                    donations.map(donation => {
                      if (
                        donation.id !== this.state.modify &&
                        !inTheFuture(donation.don_ts)
                      ) {
                        return (
                          <InlineLine
                            {...this.props}
                            key={donation.id}
                            sponsorship={donation}
                            paymentTypes={this.props.paymentType.items}
                            onEdit={this.onModify}
                            onDelete={this.onDelete}
                          />
                        );
                      } else if (donation.id === this.state.modify) {
                        return (
                          <InlineDonation
                            item={donation}
                            paymentTypes={this.props.paymentType.items}
                            mode={this.props.mode}
                            onSubmit={this.onSubmitModify}
                            onCancel={this.onCloseForm}
                            errors={this.props.donation.updateOneError}
                          />
                        );
                      }
                      return null;
                    })
                  ) : (
                    <InlineMore
                      label="Afficher tous les dons"
                      onClick={this.onMore}
                    />
                  ))}
                {others && this.state.more && (
                  <InlineCloseMore
                    label="Cacher les dons terminés"
                    onClick={this.onMore}
                  />
                )}
                {!this.state.add && donations.length <= 0 && (
                  <InlineEmpty label="Aucun don" />
                )}
                {this.state.add ? (
                  <InlineDonation
                    item={this.props.sponsorship.emptyItem}
                    paymentTypes={this.props.paymentType.items}
                    mode={this.props.mode}
                    onCancel={this.onCloseForm}
                    onSubmit={this.onSubmitAdd}
                    errors={this.props.sponsorship.createOneError}
                  />
                ) : (
                  <InlineAddOne
                    label="Ajouter un don"
                    onClick={this.onAdd}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    donation: state.donation,
    paymentType: state.paymentType,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InlineDonations);
