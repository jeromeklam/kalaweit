import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from 'freejsonapi';
import { ResponsiveList } from 'freeassofront';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
} from '../icons';

export class List extends Component {
  static propTypes = {
    causeType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/cause-main-type/create');
  }

  onGetOne(id) {
    this.props.history.push('/cause-main-type/modify/' + id);
  }

  onDelOne(id) {
    this.props.actions.delOne(id).then(result => this.props.actions.loadMore({}, true));
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  onQuickSearch(quickSearch) {
    this.props.actions.updateQuickSearch(quickSearch);
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, 2000);
    this.setState({ timer: timer });
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

  onClearFilters() {
    this.props.actions.initFilters();
    this.props.actions.initSort();
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, 2000);
    this.setState({ timer: timer });
  }

  onLoadMore(event) {
    this.props.actions.loadMore();
  }

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.causeMainType.items.FreeAsso_CauseMainType) {
      items = buildModel(this.props.causeMainType.items, 'FreeAsso_CauseMainType');
    }
    const globalActions = [
      {
        name: 'create',
        label: 'Ajouter',
        onClick: this.onCreate,
        theme: 'primary',
        icon: <AddOneIcon color="white" />,
      },
    ];
    const inlineActions = [
      {
        name: 'modify',
        label: 'Modifier',
        onClick: this.onGetOne,
        theme: 'secondary',
        icon: <GetOneIcon color="white" />,
      },
      {
        name: 'delete',
        label: 'Supprimer',
        onClick: this.onDelOne,
        theme: 'warning',
        icon: <DelOneIcon color="white" />,
      },
    ];
    const cols = [
      {
        name: 'name',
        label: 'Nom',
        col: 'camt_name',
        size: '20',
        mob_size: '',
        title: true,
        sortable: true,
        filterable: { type: 'text' },
      },
    ];
    return (
      <ResponsiveList
        title="Grandes cause"
        cols={cols}
        items={items}
        quickSearch={null}
        mainCol="camt_name"
        cancelPanelIcon={<CancelPanelIcon />}
        validPanelIcon={<ValidPanelIcon />}
        sortDownIcon={<SortDownIcon color="secondary" />}
        sortUpIcon={<SortUpIcon color="secondary" />}
        sortNoneIcon={<SortNoneIcon color="secondary" />}
        inlineActions={inlineActions}
        globalActions={globalActions}
        sort={this.props.causeMainType.sort}
        filters={this.props.causeMainType.filters}
        onSearch={null}
        onClearFilters={null}
        onSort={this.onUpdateSort}
        onSetFiltersAndSort={this.onSetFiltersAndSort}
        onLoadMore={this.onLoadMore}
        loadMorePending={this.props.causeMainType.loadMorePending}
        loadMoreFinish={this.props.causeMainType.loadMoreFinish}
        loadMoreError={this.props.causeMainType.loadMoreError}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    causeMainType: state.causeMainType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
