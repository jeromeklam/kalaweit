import React, { Component } from 'react';
import { FilterClear as FilterClearIcon } from '../icons';

export default class ButtonFilterClear extends Component {
  static propTypes = {

  };

  render() {
    let disabled = this.props.disabled || false;
    return (
      <button type="button" className="btn btn-secondary" onClick={this.props.onClick} disabled={disabled}>
        {this.props.icon && <FilterClearIcon color="white" />}
        {this.props.label && <span>Filtrer</span>}
      </button>
    );
  }
}
