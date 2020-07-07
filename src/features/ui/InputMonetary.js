import React, { Component } from 'react';
import { InputMonetary as FAInputMonetary } from 'freeassofront';
import { Swap as SwapIcon, LockOn as LockOnIcon, LockOff as LockOffIcon } from '../icons';

export default class InputDate extends Component {
  render() {
    let lockIcon = null;
    let disabled = this.props.disabled || false;
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
      <FAInputMonetary
        {...this.props}
        lockIcon={lockIcon}
        onLockToggle={toggle}
        disabled={disabled}
        swapIcon={<SwapIcon className="text-secondary" size={0.9} />}
      />
    );
  }
}
