import React, { Component } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Sort, SortUp, SortDown } from '../icons';

export class DesktopListTitle extends Component {
  static propTypes = {};

  render() {
    const sort = this.props.sort;
    return (
      <div
        className={classnames(
          'common-desktop-list-title',
          this.props.common.sidebar && 'common-desktop-list-header-menu',
          'row data-list row-list-titles',
        )}
      >
        {this.props.cols.map((oneCol, i) => {
          const first = i === 0;
          const last = i === this.props.cols.length - 1;
          const found = sort && sort.find(element => element.col === oneCol.col);
          let crt = 'none';
          let way = 'up';
          let title = 'Aucun tri';
          if (found) {
            crt = found.way;
            if (found.way === 'up') {
              title = 'Tri croissant';
              way = 'down';
            } else {
              title = 'Tri décroissant';
              way = 'none';
            }
          } else {
            way = 'up';
          }
          return (
            <div
              key={oneCol.name}
              title={title}
              className={classnames(
                'col-' + oneCol.size,
                'col-vertical-align',
                oneCol.sortable && 'sortable',
                first && 'col-first',
                last && 'col-last',
              )}
              onClick={() => {
                this.props.onSort(oneCol, way);
              }}
            >
              <span>{oneCol.label}</span>
              {
                {
                  down: <SortDown color="black" className="list-sort-icon" />,
                  up: <SortUp color="black" className="list-sort-icon" />,
                  none: <Sort color="black" className="list-sort-icon" />,
                  default: <Sort color="black" className="list-sort-icon" />,
                }[crt]
              }
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DesktopListTitle);
