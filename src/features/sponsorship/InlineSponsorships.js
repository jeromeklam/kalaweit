import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel, getJsonApi } from 'freejsonapi';
import { Loading3Dots } from 'freeassofront';
import { createSuccess, createError } from '../ui';
import { inTheFuture } from '../../common';
import {
  InlineHeader,
  InlineLine,
  InlineEmpty,
  InlineMore,
  InlineCloseMore,
  InlineAddOne,
  InlineSponsorship,
} from './';

export class InlineSponsorships extends Component {
  static propTypes = {
    sponsorship: PropTypes.object.isRequired,
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
  }

  componentDidMount() {
    if (!this.props.sponsorship.emptyItem) {
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
    const obj = getJsonApi(datas, 'FreeAsso_Sponsorship', true);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_Sponsorship', result);
        let filters = {};
        if (this.props.mode === 'cause') {
          filters = {cau_id: this.props.id}
        } else {
          filters = {cli_id: this.props.id}
        }
        this.setState({ add: false, modify: 0 });
        this.props.actions.loadSponsorships(filters);
      })
      .catch(errors => {
        // @todo display errors to fields
        createError();
      });
  }

  onModify(id) {
    this.setState({ modify: id, add: false });
  }

  onDelete(id) {

  }

  onCloseForm() {
    this.setState({ add: false, modify: 0 });
  }

  render() {
    let sponsorships = [];
    if (this.props.sponsorship.sponsorships.FreeAsso_Sponsorship) {
      sponsorships = buildModel(this.props.sponsorship.sponsorships, 'FreeAsso_Sponsorship', null, {
        eager: true,
      });
    }
    let others = false;
    return (
      <div>
        <div className="sponsorship-inline-sponsorships">
          {this.props.sponsorship.loadSponsorshipsPending ? (
            <div className="text-center">
              <Loading3Dots className="text-light" />
            </div>
          ) : (
            <div className="cause-inline-sponsorships">
              <div className="inline-list">
                {sponsorships.length > 0 && <InlineHeader {...this.props} />}
                {sponsorships.length > 0 &&
                  sponsorships.map(sponsorship => {
                    if (
                      sponsorship.id !== this.state.modify &&
                      inTheFuture(sponsorship.spo_to)
                    ) {
                      return (
                        <InlineLine
                          {...this.props}
                          key={sponsorship.id}
                          sponsorship={sponsorship}
                          paymentTypes={this.props.paymentType.items}
                          onEdit={this.onModify}
                          onDelete={this.onDelete}
                        />
                      );
                    } else {
                      if (sponsorship.id === this.state.modify) {
                        return (
                          <InlineSponsorship
                            item={sponsorship}
                            paymentTypes={this.props.paymentType.items}
                            mode={this.props.mode}
                            onCancel={this.onCloseForm}
                          />
                        );
                      }
                      others = true;
                    }
                    return null;
                  })}
                {others &&
                  (this.state.more ? (
                    sponsorships.map(sponsorship => {
                      if (
                        sponsorship.id !== this.state.modify &&
                        !inTheFuture(sponsorship.spo_to)
                      ) {
                        return (
                          <InlineLine
                            {...this.props}
                            key={sponsorship.id}
                            sponsorship={sponsorship}
                            paymentTypes={this.props.paymentType.items}
                            onEdit={this.onModify}
                            onDelete={this.onDelete}
                          />
                        );
                      } else if (sponsorship.id === this.state.modify) {
                        return (
                          <InlineSponsorship
                            item={sponsorship}
                            paymentTypes={this.props.paymentType.items}
                            mode={this.props.mode}
                            onCancel={this.onCloseForm}
                          />
                        );
                      }
                      return null;
                    })
                  ) : (
                    <InlineMore onClick={this.onMore} />
                  ))}
                {others && this.state.more && <InlineCloseMore onClick={this.onMore} />}
                {sponsorships.length <= 0 && <InlineEmpty />}
                {this.state.add ? (
                  <InlineSponsorship
                    item={this.props.sponsorship.emptyItem}
                    paymentTypes={this.props.paymentType.items}
                    mode={this.props.mode}
                    onCancel={this.onCloseForm}
                    onSubmit={this.onSubmitAdd}
                    errors={this.props.sponsorship.createOneError}
                  />
                ) : (
                  <InlineAddOne onClick={this.onAdd} />
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
    sponsorship: state.sponsorship,
    paymentType: state.paymentType,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InlineSponsorships);
