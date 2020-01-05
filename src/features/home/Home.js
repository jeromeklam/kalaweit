import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Desktop, Mobile } from 'freeassofront'
import fond from '../../images/fond.jpg';
import logo from '../../images/logo-timbre.png';
import {Stats} from '../dashboard';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="container-fluid">
        <Mobile>
          {this.props.auth.authenticated ? (
            <Stats />
          ) : (
          <div className="text-center">
            <br />
            <h5>Kalaweit</h5>
            <br />
            <img src={logo} alt="logo"/>
            <br />
            <br />
          </div>
          )}
        </Mobile>
        <Desktop>
            <div className="text-center">
              <img className="fond-site" src={fond} alt="fond"/>
              <br />
              <br />
              <br />
              <Stats />
            </div>
        </Desktop>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    auth: state.auth,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
