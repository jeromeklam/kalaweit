import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Public from '@Modules/pawbx/auth/components/Public';

export default function(ComposedComponent, route) {
  class Authenticate extends Component {
    componentWillMount() {
      if (this.props.authFirstChecked && !this.props.authenticated) {
        this.context.router.push('/public/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (this.props.authFirstChecked && !nextProps.authenticated) {
        this.context.router.push('/public/login');
      }
    }

    render() {
      if (!this.props.authenticated) {
        return <Public />;
      } else {
        return <ComposedComponent {...this.props} />;
      }
    }
  }

  Authenticate.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    authFirstChecked: PropTypes.bool.isRequired,
    menu: PropTypes.object.isRequired,
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  function mapStateToProps(state) {
    return {
      menu: state.menu,
      authenticated: state.auth.authenticated,
      authFirstChecked: state.auth.authFirstChecked,
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
