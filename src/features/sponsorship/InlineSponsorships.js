import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel, getJsonApi } from 'freejsonapi';
import { Loading3Dots } from 'freeassofront';
import InlineForm from './InlineForm';
import { DelOne as DelOneIcon, SimpleValid as SimpleValidIcon } from '../icons';

export class InlineSponsorships extends Component {
  static propTypes = {
    sponsorship: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (!this.props.paymentType.emptyItem) {
      this.props.actions.loadOne(0);
    }
  }

  render() {
    let sponsorships = [];
    if (this.props.sponsorship.sponsorships.FreeAsso_Sponsorship) {
      sponsorships = buildModel(this.props.sponsorship.sponsorships, 'FreeAsso_Sponsorship', null, {
        eager: true,
      });
    }
    return (
      <div>
        <div className="sponsorship-inline-sponsorships">
          {this.props.sponsorship.loadSponsorshipsPending ? (
            <div className="text-center">
              <Loading3Dots className="text-light" />
            </div>
          ) : (
            <div className="row p-2 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
              {sponsorships.map(sponsorship => {
                return (
                  <div className="col" key={sponsorship.id}>
                    <div className="card mt-2">
                      <div className="card-header">
                        <div className="row">
                          <div className="col-20">
                            <span className="">
                              {sponsorship.cause && sponsorship.cause.id > 0
                                ? 'Parrainage régulier'
                                : 'Don régulier'}
                            </span>
                          </div>
                          <div className="col-16 text-right">
                            <div className="btn-group btn-group-sm" role="group" aria-label="...">
                              <div className="btn-group" role="group" aria-label="First group">
                                <div className="ml-2">
                                  <SimpleValidIcon className="text-secondary inline-action" />
                                </div>
                                <div className="ml-2">
                                  <DelOneIcon className="text-secondary inline-action" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body text-left">
                        <InlineForm
                          item={sponsorship}
                          mode={this.props.mode}
                          payment_types={this.props.paymentType.items}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              {this.props.sponsorship.emptyItem &&
                <div className="col" key={'000'}>
                  <div className="card mt-2">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-26">
                          <span className="">Ajouter un don/parrainage</span>
                        </div>
                        <div className="col-10 text-right">
                          <div className="btn-group btn-group-sm" role="group" aria-label="...">
                            <div className="btn-group" role="group" aria-label="First group">
                              <div className="ml-2">
                                <SimpleValidIcon className="text-secondary inline-action" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body text-center">
                      <InlineForm
                        item={this.props.sponsorship.emptyItem}
                        mode={this.props.mode}
                        payment_types={this.props.paymentType.items}
                      />
                    </div>
                  </div>
                </div>
              }
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
