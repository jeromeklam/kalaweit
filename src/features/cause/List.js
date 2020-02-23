import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as sponsorshipActions from '../sponsorship/redux/actions';
import { buildModel } from 'freejsonapi';
import { ResponsiveList, ResponsiveQuickSearch } from 'freeassofront';
import { causeTypeAsOptions } from '../cause-type/functions';
import { siteAsOptions } from '../site/functions';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  GetPhoto as GetPhotoIcon,
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
  Sponsorship as SponsorshipIcon,
} from '../icons';
import { InlinePhotos, Create, Modify } from './';
import { InlineSponsorships } from '../sponsorship';

export class List extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      photos: 0,
      sponsorship: 0,
      cauId: -1,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onOpenPhoto = this.onOpenPhoto.bind(this);
    this.onClosePhoto = this.onClosePhoto.bind(this);
    this.onOpenSponsorship = this.onOpenSponsorship.bind(this);
    this.onCloseSponsorship = this.onCloseSponsorship.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ cauId: 0 });
  }

  onGetOne(id) {
    this.setState({ cauId: id });
  }

  onClose() {
    this.setState({ cauId: -1 });
  }

  onOpenPhoto(id) {
    const { photos } = this.state;
    if (photos === id) {
      this.setState({ photos: 0, sponsorship: 0 });
    } else {
      this.props.actions.loadPhotos(id, true).then(result => {});
      this.setState({ photos: id, sponsorship: 0 });
    }
  }

  onClosePhoto() {
    this.setState({ photos: 0 });
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

  onOpenSponsorship(id) {
    const { sponsorship } = this.state;
    if (sponsorship === id) {
      this.setState({ photos: 0, sponsorship: 0 });
    } else {
      this.props.actions.loadSponsorships({ cau_id: id }, true).then(result => {});
      this.setState({ photos: 0, sponsorship: id });
    }
  }

  onCloseSponsorship() {
    this.setState({ sponsorship: 0 });
  }

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.cause.items.FreeAsso_Cause) {
      items = buildModel(this.props.cause.items, 'FreeAsso_Cause');
    }
    const globalActions = [
      {
        name: 'clear',
        label: 'Effacer',
        onClick: this.onClearFilters,
        theme: 'secondary',
        icon: <FilterClearIcon color="white" />,
        role: 'OTHER',
      },
      {
        name: 'create',
        label: 'Ajouter',
        onClick: this.onCreate,
        theme: 'primary',
        icon: <AddOneIcon color="white" />,
        role: 'CREATE',
      },
    ];
    const inlineActions = [
      {
        name: 'sponsorship',
        label: 'Dons réguliers',
        onClick: this.onOpenSponsorship,
        theme: 'secondary',
        icon: <SponsorshipIcon color="white" />,
      },
      {
        name: 'images',
        label: 'Photos',
        onClick: this.onOpenPhoto,
        theme: 'secondary',
        icon: <GetPhotoIcon color="white" />,
        role: 'OTHER',
      },
      {
        name: 'modify',
        label: 'Modifier',
        onClick: this.onGetOne,
        theme: 'secondary',
        icon: <GetOneIcon color="white" />,
        role: 'MODIFY',
      },
      {
        name: 'delete',
        label: 'Supprimer',
        onClick: this.onDelOne,
        theme: 'warning',
        icon: <DelOneIcon color="white" />,
        role: 'DELETE',
      },
    ];
    const cols = [
      {
        name: 'id',
        label: 'Identifiant',
        col: 'id',
        size: '6',
        mob_size: '',
        title: true,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'name',
        label: 'Nom',
        col: 'cau_name',
        size: '6',
        mob_size: '',
        title: true,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'type',
        label: 'Type',
        col: 'cause_type.caut_name',
        size: '12',
        mob_size: '18',
        title: false,
        sortable: true,
      },
      {
        name: 'site',
        label: 'Site',
        col: 'site.site_name',
        size: '10',
        mob_size: '',
        title: false,
        sortable: true,
      },
      {
        name: 'type',
        label: 'Type',
        col: 'cause_type.caut_id',
        size: '0',
        mob_size: '0',
        hidden: true,
        filterable: {
          type: 'select',
          options: causeTypeAsOptions(this.props.causeType.items),
        },
      },
      {
        name: 'site',
        label: 'Site',
        col: 'site.site_id',
        size: '0',
        mob_size: '0',
        hidden: true,
        filterable: {
          type: 'select',
          options: siteAsOptions(this.props.site.items),
        },
      },
    ];
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.cause.filters.findFirst('cau_name');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label="Recherche nom"
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary" />}
      />
    );
    const filterIcon = this.props.cause.filters.isEmpty() ? (
      <FilterIcon color="white" />
    ) : (
      <FilterFullIcon color="white" />
    );
    let inlineComponent = null;
    let id = null;
    if (this.state.photos > 0) {
      inlineComponent = <InlinePhotos />;
      id = this.state.photos;
    } else {
      if (this.state.sponsorship > 0) {
        inlineComponent = <InlineSponsorships mode="cause" id={this.state.sponsorship} />;
        id = this.state.sponsorship;
      }
    }
    return (
      <div>
        <ResponsiveList
          title="Causes"
          cols={cols}
          items={items}
          quickSearch={quickSearch}
          mainCol="cau_name"
          filterIcon={filterIcon}
          cancelPanelIcon={<CancelPanelIcon />}
          validPanelIcon={<ValidPanelIcon />}
          sortDownIcon={<SortDownIcon color="secondary" />}
          sortUpIcon={<SortUpIcon color="secondary" />}
          sortNoneIcon={<SortNoneIcon color="secondary" />}
          inlineActions={inlineActions}
          inlineOpenedId={id}
          inlineComponent={inlineComponent}
          globalActions={globalActions}
          sort={this.props.cause.sort}
          filters={this.props.cause.filters}
          onSearch={this.onQuickSearch}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onClearFilters={this.onClearFilters}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.cause.loadMorePending}
          loadMoreFinish={this.props.cause.loadMoreFinish}
          loadMoreError={this.props.cause.loadMoreError}
        />
        {this.state.cauId > 0 && (
          <Modify modal={true} cauId={this.state.cauId} onClose={this.onClose} />
        )}
        {this.state.cauId === 0 && <Create modal={true} onClose={this.onClose} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cause: state.cause,
    site: state.site,
    causeType: state.causeType,
    causeMainType: state.causeMainType,
    sponsorship: state.sponsorship,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...sponsorshipActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
