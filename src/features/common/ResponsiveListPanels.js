import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SimpleValid as SimpleValidIcon, SimpleCancel as SimpleCancelIcon } from '../icons';
import { SortableList } from '../sort/SortableList';
import { FilterBuilder } from '../filter';
import { Filter } from '../filter';
import { FILTER_SEARCH_SIMPLE } from '../filter';

const sortLocal = (cols, sort) => {
  let local = [];
  sort.forEach(elt => {
    let elt3 = false;
    cols.forEach(elt2 => {
      if (elt.col === elt2.col) {
        elt3 = elt2;
        return true;
      }
    });
    let newElt = {
      col: elt.col,
      way: elt.way,
      label: elt3.label,
      full: elt3,
    };
    local.push(newElt);
  });
  cols.forEach(elt => {
    if (elt.sortable) {
      const found = local.find(elt2 => {
        return elt2.col === elt.col;
      });
      if (!found) {
        let newElt = {
          col: elt.col,
          way: 'none',
          label: elt.label,
          full: elt,
        };
        local.push(newElt);
      }
    }
  });
  return local;
};

export default class ResponsiveListPanels extends Component {
  static propTypes = {
    cols: PropTypes.array.isRequired,
    sort: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    let filters = new Filter();
    if (props.filters) {
      filters = props.filters.clone();
    }
    this.state = {
      current: props.sort,
      panel: 'filter',
      sort: sortLocal(props.cols, props.sort),
      filter: filters,
    };
    this.changePanel = this.changePanel.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onFilterMode = this.onFilterMode.bind(this);
    this.onFilterOperator = this.onFilterOperator.bind(this);
    this.onValid = this.onValid.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.current !== props.sort || state.filter !== props.filters) {
      return {
        current: props.sort,
        sort: sortLocal(props.cols, props.sort),
        filter: props.filters.clone(),
      };
    }
    return null;
  }

  changePanel(panel) {
    this.setState({ panel: panel });
  }

  onSortEnd({ oldIndex, newIndex }) {
    let old = this.state.sort[oldIndex];
    let way = old.way;
    if (way === 'none') {
      way = 'up';
    }
    old.way = way;
    let newSort = this.state.sort;
    if (newIndex > oldIndex) {
      newSort.splice(newIndex + 1, 0, old);
      newSort.splice(oldIndex, 1);
    } else {
      newSort.splice(newIndex, 0, old);
      newSort.splice(oldIndex + 1, 1);
    }
    this.setState({ sort: newSort });
  }

  onSortChange(col) {
    let newSort = this.state.sort;
    newSort.forEach(elt => {
      if (elt.col === col.col) {
        if (elt.way === 'none') {
          elt.way = 'up';
        } else {
          if (elt.way === 'up') {
            elt.way = 'down';
          } else {
            elt.way = 'none';
          }
        }
        return true;
      }
    });
    this.setState({ sort: newSort });
  }

  onFilterChange(event) {
    let filter = this.props.filters;
    filter.addFilter(event.target.name, event.target.value);
    filter.setSearch(FILTER_SEARCH_SIMPLE);
    this.setState({ filter: filter });
  }

  onFilterMode(event) {
    let filter = this.state.filter;
    filter.setMode(event.target.value);
    filter.setSearch(FILTER_SEARCH_SIMPLE);
    this.setState({ filter: filter });
  }

  onFilterOperator(event) {
    let filter = this.state.filter;
    filter.setOperator(event.target.value);
    filter.setSearch(FILTER_SEARCH_SIMPLE);
    this.setState({ filter: filter });
  }

  onValid(event) {
    if (event) {
      event.preventDefault();
    }
    let sort = [];
    this.state.sort.forEach(elt => {
      if (elt.way !== 'none') {
        const nElt = {
          col: elt.col,
          way: elt.way,
        };
        sort.push(nElt);
      }
    });
    this.props.onToggleFilter(this.state.filter, sort);
  }

  render() {
    return (
      <div className="common-responsive-list-panels">
        <div className="common-responsive-list-navbar">
          <ul className="nav nav-tabs">
            <li className={classnames('nav-item', this.state.panel === 'filter' && 'active')}>
              <a
                className="nav-link"
                onClick={() => {
                  this.changePanel('filter');
                }}
              >
                Filtres
              </a>
            </li>
            <li className={classnames('nav-item', this.state.panel === 'sort' && 'active')}>
              <a
                className="nav-link"
                onClick={() => {
                  this.changePanel('sort');
                }}
              >
                Tri
              </a>
            </li>
          </ul>
          <div className="common-responsive-list-panels-close">
            <button className="btn btn-primary" onClick={this.onValid}>
              <SimpleValidIcon color="white" />
            </button>
            <button className="btn btn-secondary" onClick={this.props.onToggleFilter}>
              <SimpleCancelIcon color="white" />
            </button>
          </div>
        </div>
        {this.state.panel === 'filter' && (
          <div className="common-responsive-list-panels-inner">
            <FilterBuilder
              cols={this.props.cols}
              filters={this.state.filter}
              onChange={this.onFilterChange}
              onMode={this.onFilterMode}
              onOperator={this.onFilterOperator}
            />
          </div>
        )}
        {this.state.panel === 'sort' && (
          <div className="common-responsive-list-panels-inner">
            <SortableList
              items={this.state.sort}
              onSortEnd={this.onSortEnd}
              onSort={this.props.onSort}
              onSortChange={this.onSortChange}
              pressDelay={200}
            />
          </div>
        )}
      </div>
    );
  }
}
