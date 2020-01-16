import React, { Component } from 'react';
import { InputDate as FAInputDate } from 'freeassofront';
import { Calendar as CalendarIcon, DelOne as DelOneIcon } from '../icons';

export default class InputDate extends Component {
  render() {
    return (
      <FAInputDate
        {...this.props}
        calIcon={<CalendarIcon size={this.props.size === 'sm' ? 0.7 : 1} className="text-primary" />}
        delIcon={<DelOneIcon size={this.props.size === 'sm' ? 0.7 : 1} className="text-warning" />}
      />
    );
  }
}
