import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { HoverObserver, ButtonGetOne, ButtonDelOne, ConfirmResponsive } from '../layout';
import { DesktopListLineCol } from './';
import { getObjectmemberValue } from '../../common';

export default class DesktopListLine extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    cols: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      confirm: false,
    };
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.onConfirmDel = this.onConfirmDel.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  mouseLeave(event) {
    this.setState({ flipped: false });
  }

  mouseEnter(event) {
    this.setState({ flipped: true });
  }

  onConfirmDel(event) {
    const confirm = this.state.confirm;
    this.setState({ confirm: !confirm });
  }

  onModalClose(event) {
    this.setState({ confirm: false });
  }

  onConfirm(event) {
    this.setState({ confirm: false });
    this.props.onDelOne(this.props.id);
  }

  render() {
    const item = this.props.item;
    return (
      <div>
        <HoverObserver onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
          <div className="row">
            {this.props.cols.map((oneCol, i) => {
              if (!oneCol.hidden) {
                const line = { ...oneCol, id: this.props.id };
                const content = getObjectmemberValue(item, oneCol.col);
                const first = i === 0;
                const last = i === this.props.cols.length - 1;
                return (
                  <DesktopListLineCol
                    key={line.name}
                    content={content}
                    {...line}
                    first={first}
                    last={last}
                    onGetOne={this.props.onGetOne}
                  />
                );
              } else {
                return null;
              }
            })}
            {this.state.flipped && (
              <div className="col-navbar col-vertical-align">
                <ul className="nav justify-content-end">
                  {this.props.inlineActions &&
                    this.props.inlineActions.map(action => (
                      <li className="nav-item" key={action.name}>
                        <button
                          type="button"
                          title={action.label || ''}
                          className={classnames('btn', action.theme && 'btn-' + action.theme)}
                          onClick={() => {
                            action.onClick(this.props.id);
                          }}
                        >
                          {action.icon}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </HoverObserver>
        <ConfirmResponsive
          show={this.state.confirm}
          onClose={this.onModalClose}
          onConfirm={this.onConfirm}
        />
      </div>
    );
  }
}
