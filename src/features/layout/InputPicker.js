import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { More, DelOne } from '../icons';
import axios from 'axios';

export default class InputPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    display: PropTypes.string,
    onClear: PropTypes.func,
    onMore: PropTypes.func,
    list: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    pickerId: PropTypes.string,
    pickerDisplay: PropTypes.string,
  };

  render() {
    return (
      <div className="client-input-picker">
        <div className="form-group row layout-input-picker">
          <label className="col-sm-6 col-form-label">
            {this.props.label}
          </label>
          <div className="col-sm-30">
            <div className="row">
              <div className="col-36 input-group">
                <input type="hidden" name={'autocomplete-field-@'} value={this.props.value} />
                <input
                  type="text"
                  name="display"
                  value={this.props.display || ''}
                  className="form-control"
                  onChange={this.props.onChange}
                />
                <div className="input-group-append">
                  {this.props.onClear && (
                    <button
                      type="button"
                      className="btn btn-outline-warning"
                      onClick={this.props.onClear}
                    >
                      <DelOne color="orange" />
                    </button>
                  )}
                  {this.props.onMore && (
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={this.props.onMore}
                    >
                      <More color="green" />
                    </button>
                  )}
                </div>
                {this.props.list && this.props.list.length > 0 && (
                  <div className="dropdown-menu show">
                    {this.props.list.map(item => {
                      return (
                        <a
                          key={item[this.props.pickerId]}
                          className="dropdown-item"
                          onClick={() => {
                            item.id = '' + item[this.props.pickerId];
                            this.props.onSelect(item);
                          }}
                        >
                          {item[this.props.pickerDisplay]}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
