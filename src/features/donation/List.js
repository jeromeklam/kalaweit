import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from 'freejsonapi';
import { ResponsiveList, ResponsiveQuickSearch } from 'freeassofront';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  Filter as FilterIcon,
  FilterFull as FilterFullIcon,
  FilterClear as FilterClearIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
  Search as SearchIcon,
} from '../icons';

export class List extends Component {
  static propTypes = {
    donation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
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
    this.props.history.push('/donation/create');
  }

  onGetOne(id) {
    this.props.history.push('/donation/modify/' + id);
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

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = false;
    if (this.props.donation.items.FreeAsso_Donation) {
      items = buildModel(this.props.donation.items, 'FreeAsso_Donation');
    }
    const globalActions = [
      {
        name: 'clear',
        label: 'Effacer',
        onClick: this.onClearFilters,
        theme: 'secondary',
        icon: <FilterClearIcon color="white" />,
      },
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
        name: 'date',
        label: 'Date',
        col: 'don_ts',
        size: '5',
        mob_size: '',
        title: true,
        sortable: true,
        type: 'date',
        filterable: { type: 'date' },
      },
      {
        name: 'mnt',
        label: 'Montant',
        col: 'don_mnt',
        size: '5',
        mob_size: '',
        sortable: true,
        type: 'monetary',
        filterable: { type: 'text' },
      },
      {
        name: 'status',
        label: 'Status',
        col: 'don_status',
        size: '5',
        mob_size: '',
        sortable: true,
        type: 'switch',
        values: [{value: 'WAIT', label: 'Attente'}, {value: 'OK', label: 'Ok'}, {value: 'NOK', label: 'Annulé'}, {value: 'NEXT', label: 'A venir'}],
        filterable: { type: 'text' },
      },
      {
        name: 'lastname',
        label: 'Nom',
        col: 'client.cli_lastname',
        size: '6',
        mob_size: '',
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'firstame',
        label: 'Prénom',
        col: 'client.cli_firstname',
        size: '6',
        mob_size: '',
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'name',
        label: 'Cause',
        col: 'cause.cau_name',
        size: '6',
        mob_size: '',
        sortable: true,
        filterable: { type: 'text' },
      },
    ];
    let search = '';
    const crit = this.props.donation.filters.findFirst('don_mnt');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label="Recherche montant"
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary" />}
      />
    );
    const filterIcon = this.props.donation.filters.isEmpty() ? (
      <FilterIcon color="white" />
    ) : (
      <FilterFullIcon color="white" />
    );
    return (
      <ResponsiveList
        title="Dons"
        cols={cols}
        items={items}
        quickSearch={quickSearch}
        mainCol="don_mnt"
        filterIcon={filterIcon}
        cancelPanelIcon={<CancelPanelIcon />}
        validPanelIcon={<ValidPanelIcon />}
        sortDownIcon={<SortDownIcon color="secondary" />}
        sortUpIcon={<SortUpIcon color="secondary" />}
        sortNoneIcon={<SortNoneIcon color="secondary" />}
        inlineActions={inlineActions}
        globalActions={globalActions}
        sort={this.props.donation.sort}
        filters={this.props.donation.filters}
        onSearch={this.onQuickSearch}
        onClearFilters={this.onClearFilters}
        onSort={this.onUpdateSort}
        onSetFiltersAndSort={this.onSetFiltersAndSort}
        onLoadMore={this.onLoadMore}
        loadMorePending={this.props.donation.loadMorePending}
        loadMoreFinish={this.props.donation.loadMoreFinish}
        loadMoreError={this.props.donation.loadMoreError}
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    donation: state.donation,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);