import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import { InlinePhotos, InlineNews, InlineSponsors, Create, Modify } from './';
import * as sponsorshipActions from '../sponsorship/redux/actions';
import { loadDonations } from '../donation/redux/actions';
import { InlineSponsorships } from '../sponsorship';
import { InlineDonations } from '../donation';

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
      news: 0,
      sponsors: 0,
      sponsorships: 0,
      donations: 0,   
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
    this.onOpenPhotos = this.onOpenPhotos.bind(this);
    this.onOpenNews = this.onOpenNews.bind(this);
    this.onOpenSponsors = this.onOpenSponsors.bind(this);
    this.onOpenSponsorships = this.onOpenSponsorships.bind(this);
    this.onOpenDonations = this.onOpenDonations.bind(this);
    this.itemClassName = this.itemClassName.bind(this);
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

  onOpenPhotos(id) {
    const { photos } = this.state;
    if (photos === id) {
      this.setState({ photos: 0, news: 0, sponsors: 0, sponsorships: 0, donations: 0 });
    } else {
      this.props.actions.loadPhotos(id, true).then(result => {});
      this.setState({ photos: id, news: 0, sponsors: 0, sponsorships: 0, donations: 0 });
    }
  }

  onOpenNews(id) {
    const { news } = this.state;
    if (news === id) {
      this.setState({ photos: 0, news: 0, sponsors: 0, sponsorships: 0, donations: 0 });
    } else {
      this.props.actions.loadNews(id, true).then(result => {});
      this.setState({ photos: 0, news: id, sponsors: 0, sponsorships: 0, donations: 0 });
    }
  }

  onOpenSponsors(id) {
    const { sponsors } = this.state;
    if (sponsors === id) {
      this.setState({ photos: 0, news: 0, sponsors: 0, sponsorships: 0, donations: 0});
    } else {
      this.props.actions.loadSponsors({ cau_id: id }, true).then(result => {});
      this.setState({ photos: 0, news: 0, sponsors: id, sponsorships: 0, donations: 0 });
    }
  }

  onOpenSponsorships(id) {
    const { sponsorships } = this.state;
    if (sponsorships === id) {
      this.setState({ photos: 0, news: 0, sponsors: 0, sponsorships: 0, donations: 0 });
    } else {
      this.props.actions.loadSponsorships({ cau_id: id }, true).then(result => {});
      this.setState({ photos: 0, news: 0, sponsors: 0, sponsorships: id, donations: 0 });
    }
  }

  onOpenDonations(id) {
    const { donations } = this.state;
    if (donations === id) {
      this.setState({photos:0, news: 0, sponsors: 0, sponsorships: 0, donations: 0 });
    } else {
      this.setState({photos:0, news: 0, sponsors: 0, sponsorships: 0, donations: id });
    }
  }

  itemClassName(item) {
    if (item && item.cau_to !== null && item.cau_to !== '') {
      return 'row-line-warning';
    }
    return '';
  }

  render() {
    // Les items à afficher avec remplissage progressif
    let items = [];
    if (this.props.cause.items.FreeAsso_Cause) {
      items = buildModel(this.props.cause.items, 'FreeAsso_Cause');
    }
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const cols = getCols(this);
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
    if (this.state.news > 0) {
      inlineComponent = <InlineNews />;
      id = this.state.news;
    } else {
      if (this.state.photos > 0) {
        inlineComponent = <InlinePhotos />;
        id = this.state.photos;
      } else {
        if (this.state.sponsors > 0) {
          inlineComponent = <InlineSponsors />
          id = this.state.sponsors;
        } else {
          if (this.state.sponsorships > 0) {
            inlineComponent = <InlineSponsorships mode="cause" id={this.state.sponsorships} />;
            id = this.state.sponsorships;
          } else {
            inlineComponent = <InlineDonations mode="cause" id={this.state.donations} />
            id = this.state.donations;
          }
        }
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
          sortDownIcon={<SortDownIcon  />}
          sortUpIcon={<SortUpIcon />}
          sortNoneIcon={<SortNoneIcon />}
          inlineActions={inlineActions}
          inlineDisplay={id}
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
          fClassName={this.itemClassName}
        />
        {this.state.cauId > 0 && (
          <Modify modal={true} cauId={this.state.cauId} onClose={this.onClose} loader={false} />
        )}
        {this.state.cauId === 0 && <Create modal={true} onClose={this.onClose} loader={false} />}
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
    sponsorship: state.sponsorships,
    donation: state.donations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...sponsorshipActions, loadDonations }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
