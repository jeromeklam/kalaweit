import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import fond from '../../images/fond.jpg';
import logo from '../../images/logo-timbre.png';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="text-right">
          <img className="fond-site d-none d-sm-block" src={fond} alt="" />
          <br />
          <img style={{position: 'relative', opacity: '0.8'}}src={logo} alt="logo" />
          <br />
          <br />
        </div>
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
