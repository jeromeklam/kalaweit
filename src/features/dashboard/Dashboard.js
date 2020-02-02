import React, { Component } from 'react';
import fond from '../../images/fond.jpg';
import { Stats } from './';

export default class Dashboard extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="container-fluid">
        <div className="text-center">
          <img className="fond-site" src={fond} alt="" />
          <br />
          <div>
            <Stats />
          </div>
        </div>
      </div>
    );
  }
}
