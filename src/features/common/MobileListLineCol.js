import React, { Component } from 'react';
import classnames from 'classnames';

export default class MobileListLineCol extends Component {
  static propTypes = {};

  render() {
    let content = this.props.content;
    if (this.props.type && this.props.values) {
      switch (this.props.type) {
        case 'switch':
          const pos = this.props.values.find(element => element.value == this.props.content);
          if (pos) {
            content = pos.label;
          }
          break;
        default:
          break;
      }
    }
    return (
      <div
        className={classnames(
          'mobile-list-line-col',
          this.props.first && 'col-first',
          this.props.last && 'col-last',
        )}
        onClick={() => {
          this.props.onGetOne(this.props.id);
        }}
      >
        <span>{content}</span>
      </div>
    );
  }
}
