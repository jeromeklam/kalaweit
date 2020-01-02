import React, { Component } from 'react';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr';
import { Calendar as CalendarIcon, DelOne as DelOneIcon } from '../icons';

registerLocale('fr', fr);

export class DateCustomInput extends Component {
  render() {
    return (
      <div className="input-group">
        <input className="form-control" value={this.props.value} onChange={() => {}} />
        <div className="input-group-append">
          <button type="button" className="btn btn-outline-warning" onClick={this.props.onClear}>
            <DelOneIcon color="orange" />
          </button>
          <button type="button" className="btn btn-outline-primary" onClick={this.props.onClick}>
            <CalendarIcon color="green" />
          </button>
        </div>
      </div>
    );
  }
}

export default class InputDate extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    let value = null;
    if (this.props.value) {
      value = Date.parse(this.props.value);
    }
    this.state = {
      value: value,
    };
    this.onDatePicker = this.onDatePicker.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onClear(event) {
    this.setState({ value: null });
    const event2 = {
      target: {
        name: this.props.name,
        value: null,
      },
    };
    this.props.onChange(event2);
  }

  onDatePicker(date) {
    this.setState({ value: date });
    const event = {
      target: {
        name: this.props.name,
        value: date,
      },
    };
    this.props.onChange(event);
  }

  render() {
    return (
      <div className={classnames('form-group', !this.props.labelTop && 'row')}>
        <label
          htmlFor={this.props.id}
          className={classnames(!this.props.labelTop && 'col-sm-6 col-form-label')}
        >
          {this.props.label}
          {this.props.required && <span>&nbsp;*</span>}
        </label>
        <div className={classnames(!this.props.labelTop && 'col-sm-30')}>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            locale="fr"
            selected={this.state.value}
            customInput={<DateCustomInput onClear={this.onClear}/>}
            customInputRef="ref"
            onChange={this.onDatePicker}
          />
        </div>
      </div>
    );
  }
}
