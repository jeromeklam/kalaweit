import React, { Component } from 'react';
import { Desktop, Mobile } from '../common';
import { Search as SearchIcon } from '../icons';

export default class InputQuickSearch extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      current: this.props.quickSearch,
      search: this.props.quickSearch,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.quickSearch !== state.current) {
      return { current: props.quickSearch, search: props.quickSearch };
    }
    return null;
  }

  onChange(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ search: event.target.value });
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.onSubmit(this.state.search);
  }

  render() {
    return (
      <div className="input-quick_search">
        <form onSubmit={this.onSubmit}>
          <div className="input-group">
            <Desktop>
              <input
                type="text"
                className="form-control"
                name={this.props.name}
                placeholder={this.props.label}
                value={this.state.search}
                onChange={this.onChange}
              />
            </Desktop>
            {this.props.mobileQuickSearch && (
              <Mobile>
                <input
                  type="text"
                  className="form-control"
                  name={this.props.name}
                  value={this.search}
                  onChange={this.onChange}
                />
              </Mobile>
            )}
            <div className="input-group-append">
              <button
                type="button"
                className="btn"
                onClick={this.onSubmit}
              >
                <SearchIcon color="white" />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
