import React, { Component } from 'react';
import fond from '../../images/fond.jpg';
import { Responsive } from 'freeassofront';
import { DashboardGrid } from './';

export default class Dashboard extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="container-fluid">
        <Responsive displayIn={['Laptop', 'Tablet']}>
          <div className="text-center">
            <img className="fond-site" src={fond} alt="" />
            <DashboardGrid />
          </div>
        </Responsive>
      </div>
    );
  }
}
