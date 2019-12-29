import React, { Component } from 'react';

export default class InputRadio extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="form-group row">
        <div className="form-radio-horizontal">
          {this.props.options.map(elt => (
            <div key={elt.value} className="form-radio-input-wrapper">
              <input type="hidden" className="form-radio-input primary" id={elt.value} />
              <div
                className="entry-label"
                onClick={() => {
                  const event = {
                    target: {
                      name: this.props.name,
                      value: elt.value,
                    },
                  };
                  this.props.onChange(event);
                }}
              >
                {elt.label}
              </div>
              <div className="circle">
                {this.props.value === elt.value && <div className="highlight"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
