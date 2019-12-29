import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from '../../common';
import { ResponsiveList } from '../common';

/**
 * Liste des sites
 */
export class List extends Component {
  /**
   * Y'a quoi dans this.props ?
   */
  static propTypes = {
    site: PropTypes.object.isRequired,
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
    this.props.history.push('/site/create');
  }

  onGetOne(id) {
    this.props.history.push('/site/modify/' + id);
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

  /**
   * Génération du contenu
   */
  render() {
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.site.items.FreeAsso_Site) {
      items = buildModel(this.props.site.items, 'FreeAsso_Site');
    }
    const cols = [
      {
        name: 'name',
        label: 'Nom site',
        col: 'site_name',
        size: '8',
        mob_size: '',
        title: true,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'address',
        label: 'Adresse',
        col: 'site_address1',
        size: '10',
        mob_size: '36',
        title: false,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'cp',
        label: 'CP',
        col: 'site_cp',
        size: '2',
        mob_size: '10',
        title: false,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'town',
        label: 'Commune',
        col: 'site_town',
        size: '10',
        mob_size: '26',
        title: false,
        sortable: true,
        filterable: { type: 'text' },
      },
    ];
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.site.filters.findFirst('site_name');
    if (crit) {
      search = crit.getFilterCrit();
    }
    return (
      <ResponsiveList
        title="Sites"
                cols={cols}
        items={items || []}
        titleSearch="Recherche nom du site"
        search={search}
        sort={this.props.site.sort}
        filters={this.props.site.filters}
        onSearch={this.onQuickSearch}
        onSearchChange={this.onSearchChange}
        onSort={this.onUpdateSort}
        onSetFiltersAndSort={this.onSetFiltersAndSort}
        onReload={this.onReload}
        onCreate={this.onCreate}
        onGetOne={this.onGetOne}
        onDelOne={this.onDelOne}
        onLoadMore={this.onLoadMore}
        mainCol="site_name"
        loadMorePending={this.props.site.loadMorePending}
        loadMoreFinish={this.props.site.loadMoreFinish}
        loadMoreError={this.props.site.loadMoreError}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    site: state.site,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
