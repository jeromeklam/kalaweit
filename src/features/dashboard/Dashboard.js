import React, { Component } from 'react';
import fond from '../../images/fond.jpg';
import { DashboardGrid } from './';

export default class Dashboard extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="container-fluid">
        <img className="fond-site" src={fond} alt="" />
        <div className="text-center">
           <DashboardGrid />
        </div>
      </div>
    );
  }
}
