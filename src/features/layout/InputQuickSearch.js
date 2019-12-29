import React, { Component } from 'react';
import { Desktop, Mobile } from '../common';
import { Search as SearchIcon, FilterClear as FilterClearIcon } from '../icons';

export default class InputQuickSearch extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.clear = this.clear.bind(this);
  }

  clear(event) {
    if (event) {
      event.preventDefault();
      const ev = {
        target: {
          name: this.props.name,
          value: '',
        },
        clear: true,
      };
      this.props.onChange(ev);
    }
  }

  render() {
    return (
      <div className="input-quick_search">
        <form onSubmit={this.props.onSubmit}>
          <div className="input-group">
            <Desktop>
              <input
                type="text"
                className="form-control"
                name={this.props.name}
                placeholder={this.props.label}
                value={this.props.quickSearch}
                onChange={this.props.onChange}
              />
            </Desktop>
            {this.props.mobileQuickSearch && (
              <Mobile>
                <input
                  type="text"
                  className="form-control"
                  name={this.props.name}
                  value={this.props.quickSearch}
                  onChange={this.props.onChange}
                />
              </Mobile>
            )}
            <div className="input-group-append">
              <button type="submit" className="btn">
                <SearchIcon color="white" />
              </button>
              {this.props.quickSearch != '' && (
                <button type="button" className="btn" onClick={this.clear}>
                  <FilterClearIcon color="white" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
