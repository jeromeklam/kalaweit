import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { injectIntl } from 'react-intl';
import { CenteredLoading3Dots } from '../ui';
import { ResponsiveConfirm } from 'freeassofront';
import {
  deleteSuccess,
  deleteError,
  InlineAddOne,
  InlineCloseMore,
  InlineEmpty,
  InlineMore,
} from '../ui';
import { inTheFuture, propagateModel } from '../../common';
import { InlineHeader, InlineLine, Create, Modify } from './';

export class InlineSponsorships extends Component {
  static propTypes = {
    sponsorship: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    let filters = {};
    if (props.mode === 'cause') {
      filters = { cau_id: props.id };
    } else {
      filters = { cli_id: props.id };
    }
    this.state = {
      confirm: -1,
      more: false,
      spoId: -1,
      filters: filters,
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
    this.props.actions.loadSponsorships(this.state.filters, true);
  }

  onMore() {
    this.setState({ more: !this.state.more });
  }

  onAdd() {
    this.setState({ spoId: 0 });
  }

  onModify(id) {
    this.setState({ spoId: id });
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
        this.setState({ add: false, spoId: -1 });
        this.props.actions.loadSponsorships(filters);
      })
      .catch(errors => {
        console.log(errors);
        deleteError();
      });
  }

  onCloseForm() {
    this.setState({ spoId: -1 });
    this.props.actions.loadSponsorships(this.state.filters, true);
  }

  onConfirm(id) {
    this.setState({ confirm: id });
  }

  onConfirmClose() {
    this.setState({ confirm: -1 });
  }

  render() {
    const { intl } = this.props;
    let sponsorships = this.props.sponsorship.sponsorshipsModels;
    let others = false;
    let counter = 0;
    return (
      <div>
        <div className="sponsorship-inline-sponsorships">
          {this.props.sponsorship.loadSponsorshipsPending ? (
            <CenteredLoading3Dots />
          ) : (
            <div className="cause-inline-sponsorships">
              <div className="inline-list">
                {sponsorships.length > 0 && <InlineHeader {...this.props} onAddOne={this.onAdd} oddEven={counter++} />}
                {sponsorships.length > 0 &&
                  sponsorships.map(sponsorship => {
                    if (inTheFuture(sponsorship.spo_to)) {
                      return (
                        <InlineLine
                          {...this.props}
                          oddEven={counter++}
                          key={sponsorship.id}
                          sponsorship={sponsorship}
                          paymentTypes={this.props.paymentType.items}
                          onGetOne={this.onModify}
                          onDelOne={this.onConfirm}
                        />
                      );
                    } else {
                      others = true;
                    }
                    return null;
                  })}
                {others &&
                  (this.state.more ? (
                    sponsorships.map(sponsorship => {
                      if (!inTheFuture(sponsorship.spo_to)) {
                        return (
                          <InlineLine
                            {...this.props}
                            oddEven={counter++}
                            key={sponsorship.id}
                            sponsorship={sponsorship}
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
                      label={intl.formatMessage({ id: 'app.features.sponsorship.list.displayFinished', defaultMessage: 'Display finished sponsorship(s)' })}
                      onClick={this.onMore}
                    />
                  ))}
                {others && this.state.more && (
                  <InlineCloseMore
                    oddEven={counter++}
                    label={intl.formatMessage({ id: 'app.features.sponsorship.list.hideFinished', defaultMessage: 'Hide finished sponsorship(s)' })}
                    onClick={this.onMore}
                  />
                )}
                {sponsorships.length <= 0 && (
                  <InlineEmpty oddEven={counter++} label={intl.formatMessage({ id: 'app.features.sponsorship.list.noSponsorship', defaultMessage: 'No sponsorship' })} />
                )}
                <InlineAddOne
                  oddEven={counter++}
                  label={intl.formatMessage({ id: 'app.features.sponsorship.list.addSponsorship', defaultMessage: 'Add one sponsorship' })}
                  onClick={this.onAdd}
                />
                {this.state.spoId > 0 && (
                  <Modify
                    loader={false}
                    spoId={this.state.spoId}
                    mode={this.props.mode}
                    parentId={this.props.id}
                    onClose={this.onCloseForm}
                  />
                )}
                {this.state.spoId === 0 && (
                  <Create
                    loader={false}
                    spoId={this.state.spoId}
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
    sponsorship: state.sponsorship,
    paymentType: state.paymentType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(InlineSponsorships));
