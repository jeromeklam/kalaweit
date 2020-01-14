import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel, getJsonApi } from 'freejsonapi';
import { Loading3Dots, ResponsiveConfirm } from 'freeassofront';
import InlineForm from './InlineForm';

export class InlineSponsorships extends Component {
  static propTypes = {
    sponsorship: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    let sponsorships = [];
    if (this.props.sponsorship.sponsorships.FreeAsso_Sponsorship) {
      sponsorships = buildModel(this.props.sponsorship.sponsorships, 'FreeAsso_Sponsorship');
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
                          <div className="col-36">
                            <span className="">{sponsorship.cause ? 'Parrainage régulier' : 'Don régulier'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="card-body text-left">
                        <InlineForm item={sponsorship} />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="col" key={'000'}>
                <div className="card mt-2">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-36">
                        <span className="">Ajouter un don régulier</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body text-center"></div>
                </div>
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
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InlineSponsorships);
