import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { normalizedObjectModeler } from 'freejsonapi';
import { ResponsiveList } from 'freeassofront';
import { getGlobalActions, getInlineActions, getCols } from './';
import * as actions from './redux/actions';
import {
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
} from '../icons';
import { showErrors, deleteSuccess } from '../ui';
import { Create, Modify } from './';

export class List extends Component {
  static propTypes = {
    paymentType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      ptypId: -1,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate() {
    this.setState({ ptypId: 0 });
  }

  onGetOne(id) {
    this.setState({ ptypId: id });
  }

  onDelOne(id) {
    this.props.actions.delOne(id)
      .then(result => {
        deleteSuccess();
        this.props.actions.loadMore({}, true);
      })
      .catch(errors => {
        showErrors(this.props.intl, errors);
      });
    ;
  }

  onClose() {
    this.setState({ ptypId: -1 });
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  onLoadMore(event) {
    this.props.actions.loadMore();
  }

  onUpdateSort(col, way, pos = 99) {
    this.props.actions.updateSort(col.col, way, pos);
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, 2000);
    this.setState({ timer: timer });
  }

  onSetFiltersAndSort(filters, sort) {
    this.props.actions.setFilters(filters);
    this.props.actions.setSort(sort);
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, 2000);
    this.setState({ timer: timer });
  }

  render() {
    const { intl } = this.props;
    let items = [];
    if (this.props.paymentType.items.FreeAsso_PaymentType) {
      items = normalizedObjectModeler(this.props.paymentType.items, 'FreeAsso_PaymentType');
    }
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const cols = getCols(this);
    // L'affichage, items, loading, loadMoreError
    return (
      <div>
        <ResponsiveList
          title={intl.formatMessage({ id: 'app.features.paymentType.list.title', defaultMessage: 'Payment types' })}
          intl={intl}
          cols={cols}
          items={items}
          mainCol="ptyp_name"
          filterIcon={null}
          cancelPanelIcon={<CancelPanelIcon />}
          validPanelIcon={<ValidPanelIcon />}
          sortDownIcon={<SortDownIcon color="secondary" />}
          sortUpIcon={<SortUpIcon color="secondary" />}
          sortNoneIcon={<SortNoneIcon color="secondary" />}
          inlineActions={inlineActions}
          globalActions={globalActions}
          sort={this.props.paymentType.sort}
          filters={this.props.paymentType.filters}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.paymentType.loadMorePending}
          loadMoreFinish={this.props.paymentType.loadMoreFinish}
          loadMoreError={this.props.paymentType.loadMoreError}
        />
        {this.state.ptypId > 0 && (
          <Modify modal={true} ptypId={this.state.ptypId} onClose={this.onClose} />
        )}
        {this.state.ptypId === 0 && <Create modal={true} onClose={this.onClose} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    paymentType: state.paymentType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(List));
