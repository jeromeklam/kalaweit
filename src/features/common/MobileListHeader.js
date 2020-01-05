import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ButtonReload } from '../layout';

export default class MobileListHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onReload: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="row row-list-title common-mobile-list-header">
        <div className="col-20">
          <span>{this.props.title}</span>
        </div>
        <div className="col-16 text-right">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <ButtonReload color="white" onClick={this.props.onReload} />
            </li>
            {this.props.globalActions &&
              this.props.globalActions.map(action => (
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
      </div>
    );
  }
}
