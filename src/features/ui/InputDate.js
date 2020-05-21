import React, { Component } from 'react';
import { InputDate as FAInputDate } from 'freeassofront';
import { Calendar as CalendarIcon, DelOne as DelOneIcon, LockOn as LockOnIcon, LockOff as LockOffIcon } from '../icons';

export default class InputDate extends Component {
  render() {
    let lockIcon = null;
    let disabled = false;
    let toggle = null;
    if (this.props.locked === false) {
      lockIcon = <LockOffIcon className="text-primary" size={0.9} />
      toggle = () => { this.props.onLockOn(this.props.name); };
    } else {
      if (this.props.locked === true) {
        lockIcon = <LockOnIcon className="text-secondary" size={0.9} />
        disabled = true;
        toggle = () => { this.props.onLockOff(this.props.name); };
      }
    }
    return (
      <FAInputDate
        {...this.props}
        lockIcon={lockIcon}
        onLockToggle={toggle}
        disabled={disabled}
        calIcon={<CalendarIcon className="text-secondary" size={0.9} />}
        delIcon={<DelOneIcon className="text-warning" size={0.9} />}
      />
    );
  }
}
