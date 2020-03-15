import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import logo from '../../images/logo-timbre.png';
import { InputEmail, InputPassword, InputCheckbox } from 'freeassofront';
import { getJsonApi, getFieldErrorMessage } from 'freejsonapi';
import { withRouter } from 'react-router-dom';
import { Copyright } from '../ui';

export class Signin extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      username: '',
      username_error: null,
      password: '',
      password_error: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.authenticated) {
      this.props.history.push('/');
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.auth.authenticated) {
      props.history.push('/');
    } else {
      if (props.auth.signInError) {
        const errors = {
          username_error: getFieldErrorMessage(props.auth.signInError, 'login'),
          password_error: getFieldErrorMessage(props.auth.signInError, 'password'),
        };
        return errors;
      }
    }
    return null;
  }

  onChange(event) {
    if (event && event.persist) {
      event.persist();
    }
    if (event && event.target) {
      switch (event.target.type) {
        case 'checkbox':
          const valcheck = event.target.checked || false;
          this.setState({ [event.target.name]: valcheck });
          break;
        default:
          const value = event.target.value;
          this.setState({ [event.target.name]: value });
          break;
      }
    }
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    let username_error = '';
    let password_error = '';
    let error = false;
    if (this.state.username === '') {
      username_error = "L'email est obligatoire";
    }
    if (this.state.password === '') {
      password_error = 'Le mot de passe est obligatoire';
    }
    this.setState({ username_error: username_error, password_error: password_error });
    if (!error) {
      const datas = {
        type: 'FreeSSO_Signin',
        login: this.state.username,
        password: this.state.password,
        remember: this.state.remember,
      };
      let obj = getJsonApi(datas, 'FreeSSO_Signin');
      this.props.actions.signIn(obj).then(result => {
        this.props.history.push('/');
      });
    }
  }

  render() {
    const { intl } = this.props;
    return (
      <div className="auth-signin">
        <form className="form-signin text-center" onSubmit={this.onSubmit}>
          <img className="mb-4" src={logo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">
            <FormattedMessage id="app.features.auth.login.title" defaultMessage="Login" />
          </h1>
          <InputEmail
            id="username"
            name="username"
            label=""
            labelTop={true}
            placeholder={intl.formatMessage({ id: 'app.features.auth.login.username', defaultMessage: 'Email address' })}
            required=""
            autoFocus=""
            value={this.state.username}
            error={this.state.username_error}
            onChange={this.onChange}
          />
          <InputPassword
            id="password"
            name="password"
            label=""
            labelTop={true}
            placeholder={intl.formatMessage({ id: 'app.features.auth.login.password', defaultMessage: 'Password' })}
            required=""
            value={this.state.password}
            error={this.state.password_error}
            onChange={this.onChange}
          />
          <div className="checkbox mb-3 mt-2">
            <InputCheckbox
              name="remember"
              checked={this.state.remember}
              detail={<FormattedMessage id="app.features.auth.login.rememberMe" defaultMessage="Connexion" />}
              onChange={this.onChange}
            />
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            <FormattedMessage id="app.features.auth.login.connexion" defaultMessage="Connexion" />
          </button>
          <Copyright />
        </form>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(Signin)));
