import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import classnames from 'classnames';
import { buildModel } from 'freejsonapi';
import { displayBool } from 'freeassofront';
import { ColCheck as ColCheckIcon } from '../icons';
import { CenteredLoading3Dots } from '../ui';

export class InlineSponsors extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    let sponsors = [];
    let counter = 0;
    if (this.props.cause.sponsors.FreeAsso_Sponsor) {
      sponsors = buildModel(this.props.cause.sponsors, 'FreeAsso_Sponsor');
    }
    return (
      <div>
        {this.props.cause.loadSponsorsPending ? (
          <CenteredLoading3Dots />
          ) : (
            <div className="inline-list">
              <div className="row row-title row-line">
                <div className="col-12">
                  <span>Nom </span>
                </div>
                <div className="col-12">
                  <span>Email </span>
                </div>
                <div className="col-4">
                  <span>Donateur </span>
                </div>
                <div className="col-4">
                  <span>News </span>
                </div>
                <div className="col-4">
                  <span>Visible site </span>
                </div>
              </div>
              {sponsors &&
                sponsors.map(item => {
                  counter++;
                  console.log("FK sponsor",item);
                  return (
                    <div
                      className={classnames(
                      'row row-line',
                        counter % 2 !== 1 ? 'row-odd' : 'row-even',
                      )}
                      key={item.id}
                    >
                      <div className="col-12">
                        <span>{item.spon_name}</span>
                      </div>
                      <div className="col-12">
                        <span>{item.spon_email}</span>
                      </div>
                      <div className="col-4">
                        <span>{displayBool(item.spon_donator,<ColCheckIcon className="text-secondary"/>,'')}</span>
                      </div>
                      <div className="col-4">
                        <span>{displayBool(item.spon_news,<ColCheckIcon className="text-secondary"/>,'')}</span>
                      </div>
                      <div className="col-4">
                        <span>{displayBool(item.spon_site,<ColCheckIcon className="text-secondary"/>,'')}</span>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          )}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cause: state.cause,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InlineSponsors);
