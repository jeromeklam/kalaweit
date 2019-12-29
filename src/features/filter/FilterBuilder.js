import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTER_MODE_OR, FILTER_MODE_AND, FILTER_OPER_LIKE, FILTER_OPER_EQUAL } from './';
import { InputRadio } from '../layout';

export default class FilterBuilder extends Component {
  static propTypes = {
    cols: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
  };

  render() {
    const mode = this.props.filters.getMode();
    const oper = this.props.filters.getOperator();
    return (
      <div className="filter-filter-builder">
        <div className="row">
          <div className="col-4">
          </div>
          <div className="col-16">
            <InputRadio
              className="ml-3 mr-1"
              id="or"
              type="radio"
              name="mode"
              value={mode}
              onChange={this.props.onMode}
              options={[{label: 'et', value: FILTER_MODE_AND}, {label: 'ou', value: FILTER_MODE_OR}]}
            />
          </div>
          <div className="col-16">
            <select className="form-control" onChange={this.props.onOperator} value={oper}>
              <option value={FILTER_OPER_LIKE}>Contient</option>
              <option value={FILTER_OPER_EQUAL}>Egal</option>
            </select>
          </div>
        </div>
        <hr />
        {this.props.cols.map(col => {
          if (col.filterable) {
            const filter = this.props.filters;
            const elem = filter.findFirst(col.col);
            let value = '';
            if (elem) {
              value = elem.getFilterCrit();
            }
            switch (col.filterable.type) {
              case 'select':
                return (
                  <div key={col.col}>
                    <div className="form-group">
                      <label htmlFor={col.col} className="">
                        {col.label}
                      </label>
                      <select
                        id={col.col}
                        name={col.col}
                        value={value}
                        className="form-control"
                        onChange={this.props.onChange}
                      >
                        <option key="0" value=""></option>
                        {col.filterable.options.map(elt => (
                          <option key={elt.value} value={elt.value}>{elt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              default:
                return (
                  <div key={col.col}>
                    <div className="form-group">
                      <label htmlFor={col.col} className="">
                        {col.label}
                      </label>
                      <input
                        type="text"
                        id={col.col}
                        name={col.col}
                        value={value}
                        className="form-control"
                        onChange={this.props.onChange}
                      />
                    </div>
                  </div>
                );
            }
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}
