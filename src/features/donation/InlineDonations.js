import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import classnames from 'classnames';
import { ScrollTo } from 'react-scroll-to';
import * as actions from './redux/actions';
import { objectToQueryString, jsonApiNormalizer, normalizedObjectModeler } from 'freejsonapi';
import { ResponsiveConfirm } from 'freeassofront';
import { freeAssoApi } from '../../common';
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
      years: [],
      loading: true,
      loadingDonations: true,
      currentYear: null,
      donations: [],
      myRef: React.createRef(),
    };
    this.onMore = this.onMore.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onCloseForm = this.onCloseForm.bind(this);
    this.onModify = this.onModify.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.localLoadDonations = this.localLoadDonations.bind(this);
    this.localLoadDonationsYears = this.localLoadDonationsYears.bind(this);
  }

  localLoadDonationsYears() {
    let filter = {
      filter: this.state.filters,
      sort: '-don_ask_ts,-don_ts',
      page: { number: 1, size: 100 },
    };
    const addUrl = objectToQueryString(filter);
    const doRequest = freeAssoApi.get('/v1/asso/donation/years' + addUrl, {});
    doRequest
      .then(result => {
        if (result && result.data) {
          const list = jsonApiNormalizer(result.data);
          const years = normalizedObjectModeler(list, 'FreeAsso_DonationYear') || false;
          let currentYear = null;
          if (years.length > 0) {
            currentYear = years[0].don_real_ts_year;
          }
          this.setState({ years: years, loading: false, currentYear: currentYear });
          this.localLoadDonations(currentYear);
        } else {
          this.setState({ years: [], loading: false, currentYear: null });
        }
      })
      .catch(error => {
        this.setState({ years: [], loading: false, currentYear: null });
      });
  }

  localLoadDonations(year) {
    this.setState({ loadingDonations: true, currentYear: year, donations: [], myRef: React.createRef() });
    let filters = this.state.filters;
    filters.don_real_ts_year = { eq: year };
    let filter = {
      filter: filters,
      sort: '-don_ask_ts,-don_ts',
      page: { number: 1, size: 300 },
    };
    const addUrl = objectToQueryString(filter);
    const doRequest = freeAssoApi.get('/v1/asso/donation' + addUrl, {});
    doRequest.then(result => {
      if (result && result.data) {
        const list = jsonApiNormalizer(result.data);
        const donations = normalizedObjectModeler(list, 'FreeAsso_Donation') || false;
        this.setState({ donations: donations, loadingDonations: false, myRef: React.createRef() });
      } else {
        this.setState({ donations: [], loadingDonations: false });
      }
    });
  }

  componentDidMount() {
    this.localLoadDonationsYears();
  }

  componentDidUpdate() {
    console.log(this.state.myRef);
    const element = this.state.myRef.current;
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
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
    let counter = 0;
    return (
      <div>
        <div className="donation-inline-donations">
          {this.state.loading ? (
            <CenteredLoading3Dots />
          ) : (
            <ScrollTo>
              {({ scroll }) => (
                <div className="cause-inline-sponsorships">
                  {this.state.years && this.state.years.length > 0 ? (
                    this.state.years.map(year => {
                      return (
                        <div class="card" key={`don_year_${year.don_real_ts_year}`}>
                          <div
                            class={classnames(
                              'card-header',
                              year.don_real_ts_year === this.state.currentYear
                                ? 'bg-primary-light text-secondary'
                                : 'bg-secondary-light',
                            )}
                          >
                            <button
                              ref={year.don_real_ts_year === this.state.currentYear ? this.state.myRef : null}
                              class={classnames(
                                'collapsed card-link',
                                year.don_real_ts_year === this.state.currentYear
                                  ? 'bg-primary-light text-secondary'
                                  : 'bg-secondary-light',
                              )}
                              onClick={() => {
                                //scroll({ ref: myRef, y: 0, smooth: true });
                                this.localLoadDonations(year.don_real_ts_year);
                              }}
                            >
                              <span>{year.don_real_ts_year}</span>
                            </button>
                          </div>
                          <div
                            class={classnames(
                              year.don_real_ts_year !== this.state.currentYear && 'collapse',
                            )}
                          >
                            <div class="card-body">
                              {year.don_real_ts_year === this.state.currentYear &&
                              this.state.loadingDonations ? (
                                <CenteredLoading3Dots />
                              ) : (
                                <div className="inline-list">
                                  {this.state.donations && this.state.donations.length > 0 && (
                                    <InlineHeader
                                      {...this.props}
                                      oddEven={counter++}
                                      onAddOne={this.onAdd}
                                    />
                                  )}
                                  {this.state.donations &&
                                    this.state.donations.length > 0 &&
                                    this.state.donations.map(donation => {
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
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <InlineEmpty label="Aucun don" />
                  )}
                </div>
              )}
            </ScrollTo>
          )}
        </div>
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
