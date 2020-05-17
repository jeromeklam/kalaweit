import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
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

  constructor(props) {
    super(props);
    this.state = {
      id: props.cauId,
    };
  }

  componentDidMount() {
    this.props.actions.loadSponsors({ cau_id: this.state.id }, true).then(result => {});
  }

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
                <span className="pl-2">
                  <FormattedMessage id="app.features.sponsor.list.name" defaultMessage="Fullname" />
                </span>
              </div>
              <div className="col-12">
                <span>
                  <FormattedMessage id="app.features.sponsor.list.email" defaultMessage="Email" />
                </span>
              </div>
              <div className="col-4">
                <span>
                  <FormattedMessage id="app.features.sponsor.list.client" defaultMessage="Member" />
                </span>
              </div>
              <div className="col-4">
                <span>
                  <FormattedMessage
                    id="app.features.sponsor.list.displaySite"
                    defaultMessage="Show on site"
                  />
                </span>
              </div>
              <div className="col-4">
                <span>
                  <FormattedMessage
                    id="app.features.sponsor.list.news"
                    defaultMessage="Send news"
                  />
                </span>
              </div>
            </div>
            {sponsors &&
              sponsors.map(item => {
                counter++;
                return (
                  <div
                    className={classnames(
                      'row row-line',
                      counter % 2 !== 1 ? 'row-odd' : 'row-even',
                    )}
                    key={item.id}
                  >
                    <div className="col-12">
                      <span className="pl-2">{item.spon_name}</span>
                    </div>
                    <div className="col-12">
                      <span>{item.spon_email}</span>
                    </div>
                    <div className="col-4">
                      <span>
                        {displayBool(
                          item.spon_donator,
                          <ColCheckIcon className="text-secondary" />,
                          '',
                        )}
                      </span>
                    </div>
                    <div className="col-4">
                      <span>
                        {displayBool(
                          item.spon_site,
                          <ColCheckIcon className="text-secondary" />,
                          '',
                        )}
                      </span>
                    </div>
                    <div className="col-4">
                      <span>
                        {displayBool(
                          item.spon_news,
                          <ColCheckIcon className="text-secondary" />,
                          '',
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(InlineSponsors));
