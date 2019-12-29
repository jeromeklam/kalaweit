import React, { Component } from 'react';

export default class InputText extends Component {
  static propTypes = {};

  render() {
    let value = '';
    if (this.props.value && this.props.value !== null) {
      value = this.props.value;
    }
    let id = this.props.name;
    if (this.props.id && this.props.id !== null) {
      id = this.props.id;
    }
    let props = {
      ...this.props,
      value: value,
      id: id,
    };
    let displayLabel = true;
    if (this.props.label === '') {
      displayLabel = false;
    }
    if (this.props.labelTop) {
      return (
        <div className="form-group">
          {displayLabel && (
            <label htmlFor={this.props.id} className="">
              {this.props.label}
              {this.props.required && <span>&nbsp;*</span>}
            </label>
          )}
          <input type="text" id={props.id} className="form-control" {...props} />
        </div>
      );
    } else {
      return (
        <div className="form-group row">
          <label htmlFor={this.props.id} className="col-sm-6 col-form-label">
            {this.props.label}
            {this.props.required && <span>&nbsp;*</span>}
          </label>
          <div className="col-sm-30">
            <input type="text" id={props.id} className="form-control" {...props} />
          </div>
        </div>
      );
    }
  }
}