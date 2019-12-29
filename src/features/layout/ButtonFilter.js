import React, { Component } from 'react';
import { Filter as FilterIcon, FilterFull as FilterFullIcon } from '../icons';

export default class ButtonFilter extends Component {
  static propTypes = {};

  render() {
    return (
      <button type="button" className="btn btn-secondary" onClick={this.props.onClick}>
        {this.props.icon && this.props.filterEmpty && <FilterIcon color="white" />}
        {this.props.icon && !this.props.filterEmpty && <FilterFullIcon color="white" />}
        {this.props.label && <span>Filtrer</span>}
      </button>
    );
  }
}
