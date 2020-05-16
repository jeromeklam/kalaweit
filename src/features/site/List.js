import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { buildModel } from 'freejsonapi';
import { ResponsiveList, ResponsiveQuickSearch } from 'freeassofront';
import {
  Filter as FilterIcon,
  FilterFull as FilterFullIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
  Search as SearchIcon,
} from '../icons';
import { deleteError, deleteSuccess } from '../ui';
import { getGlobalActions, getInlineActions, getCols } from './';
import { Create, Modify } from './';

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
      siteId: -1,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ siteId: 0 });
  }

  onClose() {
    this.setState({ siteId: -1 });
  }

  onGetOne(id) {
    this.setState({ siteId: id });
  }

  onDelOne(id) {
    this.props.actions
      .delOne(id)
      .then(result => {
        deleteSuccess();
        this.props.actions.loadMore({}, true)
      })
      .catch(errors => {
        deleteError();
      });
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

  /**
   * Génération du contenu
   */
  render() {
    // Les des items à afficher avec remplissage progressif
    const { intl } = this.props;
    let items = [];
    if (this.props.site.items.FreeAsso_Site) {
      items = buildModel(this.props.site.items, 'FreeAsso_Site');
    }
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const cols = getCols(this);
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.site.filters.findFirst('site_name');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label={intl.formatMessage({ id: 'app.features.site.list.quicksearch', defaultMessage: 'Search by name' })}
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary" />}
      />
    );
    const filterIcon = this.props.site.filters.isEmpty() ? (
      <FilterIcon color="white" />
    ) : (
      <FilterFullIcon color="white" />
    );
    return (
      <div>
        <ResponsiveList
          title={intl.formatMessage({ id: 'app.features.site.list.title', defaultMessage: 'Sites' })}
          intl={intl}
          cols={cols}
          items={items || []}
          quickSearch={quickSearch}
          mainCol="site_name"
          filterIcon={filterIcon}
          cancelPanelIcon={<CancelPanelIcon color="light" />}
          validPanelIcon={<ValidPanelIcon color="light" />}
          sortDownIcon={<SortDownIcon color="secondary" />}
          sortUpIcon={<SortUpIcon color="secondary" />}
          sortNoneIcon={<SortNoneIcon color="secondary" />}
          inlineActions={inlineActions}
          globalActions={globalActions}
          sort={this.props.site.sort}
          filters={this.props.site.filters}
          onSearch={this.onQuickSearch}
          onClearFilters={this.onClearFilters}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.site.loadMorePending}
          loadMoreFinish={this.props.site.loadMoreFinish}
          loadMoreError={this.props.site.loadMoreError}
        />
        {this.state.siteId > 0 && (
          <Modify modal={true} siteId={this.state.siteId} onClose={this.onClose} />
        )}
        {this.state.siteId === 0 && <Create modal={true} onClose={this.onClose} />}
      </div>
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(List));
