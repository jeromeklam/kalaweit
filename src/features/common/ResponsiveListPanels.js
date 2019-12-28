import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  SimpleValid as SimpleValidIcon,
  SimpleCancel as SimpleCancelIcon,
  Sort as SortIcon,
  SortUp as SortUpIcon,
  SortDown as SortDownIcon,
} from '../icons';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value, way, onSortChange }) => {
  return (
    <li className="list-group-item">
      {value}{' '}
      <div className="sort-icon">
        {' '}
        <div onClick={onSortChange}>{way}</div>
      </div>
    </li>
  );
});

const SortableList = SortableContainer(({ items, onSort, onSortChange }) => {
  return (
    <ul className="list-group">
      {items.map((value, index) => {
        let icon = <SortIcon color="white" title="Aucun tri" onSort={onSort} />;
        if (value.way === 'up') {
          icon = <SortUpIcon color="white" title="Tri croissant" onSort={onSort} />;
        } else {
          if (value.way === 'down') {
            icon = <SortDownIcon color="white" title="Tri décroissant" onSort={onSort} />;
          }
        }
        return (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value.label}
            way={icon}
            onSortChange={() => {
              onSortChange(value);
            }}
          />
        );
      })}
    </ul>
  );
});

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
  });
  return local;
};

export default class ResponsiveListPanels extends Component {
  static propTypes = {
    cols: PropTypes.array.isRequired,
    sort: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: props.sort,
      panel: 'filter',
      sort: sortLocal(props.cols, props.sort),
    };
    this.changePanel = this.changePanel.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.onValid = this.onValid.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.current !== props.sort) {
      return { current: props.sort, sort: sortLocal(props.cols, props.sort) };
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
    this.setState({sort:newSort});
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
        }
        sort.push(nElt);
      }
    })
    this.props.onToggleFilter(false, sort);
  }

  render() {
    return (
      <div className="common-responsive-list-panels">
        <div>
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
