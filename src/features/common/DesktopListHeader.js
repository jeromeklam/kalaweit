import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { ButtonReload, ButtonFilter, ButtonFilterClear, InputQuickSearch } from '../layout';

export class DesktopListHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onReload: PropTypes.func.isRequired,
    filterEmpty: PropTypes.bool.isRequired,
    onClearFilters: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      quickSearch: '',
      filter: false,
    };
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  onQuickSearch(value) {
    this.props.onQuickSearch(value);
  }

  onChangeSearch(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.clear) {
      this.props.onQuickSearch('');
    }
  }

  render() {
    return (
      <div
        className={classnames(
          this.props.common.sidebar && 'common-desktop-list-header-menu',
          'common-desktop-list-header row row-list-title',
        )}
      >
        <div className="col-10">
          <span>{this.props.title}</span>
        </div>
        <div className="col-14">
          {this.props.onQuickSearch && (
            <InputQuickSearch
              name="quickSearch"
              label={this.props.labelSearch}
              quickSearch={this.props.search}
              onSubmit={this.onQuickSearch}
              onChange={this.props.onSearchChange}
            />
          )}
        </div>
        <div className="col-12 text-right">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <ButtonFilterClear
                color="white"
                onClick={this.props.onClearFilters}
                icon={true}
                disabled={this.props.search === ''}
              />
            </li>
            <li className="nav-item">
              <ButtonFilter
                color="white"
                filterEmpty={this.props.filterEmpty}
                icon={true}
                onClick={this.props.onToggleFilter}
              />
            </li>
            <li className="nav-item">
              <ButtonReload color="white" onClick={this.props.onReload} icon={true} />
            </li>
            {this.props.globalActions &&
              this.props.globalActions.map(action => (
                <li className="nav-item" key={action.name}>
                  <button
                    type="button"
                    title={action.label || ''}
                    className={classnames('btn', action.theme && 'btn-' + action.theme)}
                    onClick={() => {
                      action.onClick(this.props.id);
                    }}
                  >
                    {action.icon}
                  </button>
                </li>
              ))}
          </ul>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DesktopListHeader);
