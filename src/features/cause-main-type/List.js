import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from '../../common';
import { ResponsiveList } from '../common';

export class List extends Component {
  static propTypes = {
    causeMainType: PropTypes.object.isRequired,
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
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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

  onLoadMore(event) {
    this.props.actions.loadMore();
  }

  onSearchChange(event) {
    this.props.actions.updateQuickSearch(event.target.value);
  }

  onQuickSearch(quickSearch) {
    this.props.actions.loadMore({}, true);
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
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.causeMainType.items.FreeAsso_CauseMainType) {
      items = buildModel(this.props.causeMainType.items, 'FreeAsso_CauseMainType');
    }
    const cols = [
      {
        name: 'name',
        label: 'Nom',
        col: 'camt_name',
        size: '30',
        mob_size: '',
        title: true,
        sortable: true,
        filterable: { type: 'text' },
      },
    ];
    let search = '';
    const crit = this.props.causeMainType.filters.findFirst('camt_name');
    if (crit) {
      search = crit.getFilterCrit();
    }
    return (
      <ResponsiveList
        title="Familles de cause"
        cols={cols}
        items={items}
        titleSearch="Recherche nom"
        search={search}
        sort={this.props.causeMainType.sort}
        filters={this.props.causeMainType.filters}
        onSearch={this.onQuickSearch}
        onSearchChange={this.onSearchChange}
        onSort={this.onUpdateSort}
        onSetFiltersAndSort={this.onSetFiltersAndSort}
        onReload={this.onReload}
        onCreate={this.onCreate}
        onGetOne={this.onGetOne}
        onDelOne={this.onDelOne}
        onLoadMore={this.onLoadMore}
        mainCol="camt_name"
        loadMorePending={this.props.causeMainType.loadMorePending}
        loadMoreFinish={this.props.causeMainType.loadMoreFinish}
        loadMoreError={this.props.causeMainType.loadMoreError}
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    causeMainType: state.causeMainType,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
