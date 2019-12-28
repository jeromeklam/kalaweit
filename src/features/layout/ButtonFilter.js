import React, { Component } from 'react';
import FilterIcon from '../icons/Filter';

export default class ButtonFilter extends Component {
  static propTypes = {

  };

  render() {
    return (
      <button 
        type="button"         
        className="btn btn-secondary"                
        onClick={this.props.onClick} 
      >
        { this.props.icon &&
          <FilterIcon color="white"/>
        }
        { this.props.label && 
         <span>Filtrer</span>
        }
      </button>
    );
  }
}
