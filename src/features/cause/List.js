import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from '../../common';
import { ResponsiveList } from '../common';

export class List extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
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
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/cause/create');
  }

  onGetOne(id) {
    this.props.history.push('/cause/modify/' + id);
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

  onLoadMore(event) {
    this.props.actions.loadMore();
  }

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.cause.items.FreeAsso_Cause) {
      items = buildModel(this.props.cause.items, 'FreeAsso_Cause');
    }
    const cols = [
      {
        name: 'id',
        label: 'Identifiant',
        col: 'id',
        size: '5',
        mob_size: '',
        title: true,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'name',
        label: 'Nom',
        col: 'cau_name',
        size: '5',
        mob_size: '',
        title: true,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'type',
        label: 'Type',
        col: 'cause_type.caut_name',
        size: '4',
        mob_size: '18',
        title: false,
      },
      { name: 'sex', label: 'M/F', col: 'cau_sex', size: '4', mob_size: '18', title: false },
      {
        name: 'color',
        label: 'Couleur',
        col: 'cau_string_1',
        size: '4',
        mob_size: '18',
        title: false,
        sortable: true,
        filterable: { type: 'text' },
      },
      { name: 'site', label: 'Site', col: 'site.site_name', size: '9', mob_size: '', title: false },
    ];
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.cause.filters.findFirst('cau_name');
    if (crit) {
      search = crit.getFilterCrit();
    }
    return (
      <ResponsiveList
        title="Causes"
        cols={cols}
        items={items}
        titleSearch="Recherche nom"
        search={search}
        sort={this.props.cause.sort}
        filters={this.props.cause.filters}
        onSearch={this.onQuickSearch}
        onSearchChange={this.onSearchChange}
        onSort={this.onUpdateSort}
        onSetFiltersAndSort={this.onSetFiltersAndSort}
        onReload={this.onReload}
        onCreate={this.onCreate}
        onGetOne={this.onGetOne}
        onDelOne={this.onDelOne}
        onLoadMore={this.onLoadMore}
        mainCol="cau_name"
        loadMorePending={this.props.cause.loadMorePending}
        loadMoreFinish={this.props.cause.loadMoreFinish}
        loadMoreError={this.props.cause.loadMoreError}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    cause: state.cause,
    causeMainType: state.causeMainType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
