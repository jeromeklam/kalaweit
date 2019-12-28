import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from '../../common';
import { ResponsiveList } from '../common';

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
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onSetSort = this.onSetSort.bind(this);
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

  onQuickSearch(quickSearch) {
    this.props.actions.loadMore(quickSearch, true);
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

  onSetSort(sort) {
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
        title: true,
      },
      {
        name: 'lastname',
        label: 'Nom',
        col: 'cli_lastname',
        size: '6',
        mob_size: '',
        sortable: true,
        title: true,
      },
      {
        name: 'firstname',
        label: 'Prénom',
        col: 'cli_firstname',
        size: '7',
        mob_size: '36',
        sortable: true,
        title: false,
      },
      {
        name: 'town',
        label: 'Ville',
        col: 'cli_town',
        size: '7',
        mob_size: '36',
        sortable: true,
        title: false,
      },
      {
        name: 'email',
        label: 'Email',
        col: 'cli_email',
        size: '10',
        mob_size: '36',
        sortable: true,
        title: false,
      },
    ];
    // L'affichage, items, loading, loadMoreError
    return (
      <ResponsiveList
        title="Membres"
        titleSearch="Recherche nom, prénom"
        cols={cols}
        items={items}
        sort={this.props.client.sort}
        onSort={this.onUpdateSort}
        setSort={this.onSetSort}
        onSearch={this.onQuickSearch}
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
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
