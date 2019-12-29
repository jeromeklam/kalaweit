import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from '../../common';
import { ResponsiveList } from '../common';
import { clientCategoryAsOptions } from '../client-category';

export class List extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
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
    this.props.history.push('/client/create');
  }

  onGetOne(id) {
    this.props.history.push('/client/modify/' + id);
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
    if (this.props.client.items.FreeAsso_Client) {
      items = buildModel(this.props.client.items, 'FreeAsso_Client');
    }
    const cols = [
      {
        name: 'id',
        label: 'Identifiant',
        col: 'id',
        size: '4',
        mob_size: '',
        sortable: true,
        filterable: { type: 'text' },
        title: true,
      },
      {
        name: 'lastname',
        label: 'Nom',
        col: 'cli_lastname',
        size: '6',
        mob_size: '',
        sortable: true,
        filterable: { type: 'text' },
        title: true,
      },
      {
        name: 'firstname',
        label: 'Prénom',
        col: 'cli_firstname',
        size: '7',
        mob_size: '36',
        sortable: true,
        filterable: { type: 'text' },
        title: false,
      },
      {
        name: 'town',
        label: 'Ville',
        col: 'cli_town',
        size: '7',
        mob_size: '36',
        sortable: true,
        filterable: { type: 'text' },
        title: false,
      },
      {
        name: 'email',
        label: 'Email',
        col: 'cli_email',
        size: '10',
        mob_size: '36',
        sortable: true,
        filterable: { type: 'text' },
        title: false,
      },
      {
        name: 'category',
        label: 'Category',
        col: 'clic_id',
        size: '0',
        mob_size: 'à',
        sortable: false,
        filterable: {
          type: 'select',
          options: clientCategoryAsOptions(this.props.clientCategory.items),
        },
        title: false,
        hidden: true,
      },
    ];
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.client.filters.findFirst('cli_firstname');
    if (crit) {
      search = crit.getFilterCrit();
    }
    return (
      <ResponsiveList
        title="Membres"
        cols={cols}
        items={items}
        titleSearch="Recherche nom, prénom"
        search={search}
        sort={this.props.client.sort}
        filters={this.props.client.filters}
        onSearch={this.onQuickSearch}
        onSearchChange={this.onSearchChange}
        onSort={this.onUpdateSort}
        onSetFiltersAndSort={this.onSetFiltersAndSort}
        onReload={this.onReload}
        onCreate={this.onCreate}
        onGetOne={this.onGetOne}
        onDelOne={this.onDelOne}
        onLoadMore={this.onLoadMore}
        mainCol="cli_firstname"
        loadMorePending={this.props.client.loadMorePending}
        loadMoreFinish={this.props.client.loadMoreFinish}
        loadMoreError={this.props.client.loadMoreError}
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    client: state.client,
    clientCategory: state.clientCategory,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);