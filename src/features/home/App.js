import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import * as actions from './redux/actions';
import * as authActions from '../auth/redux/actions';
import * as commonActions from '../common/redux/actions';
import { ResponsivePage } from 'freeassofront';
import { initAxios } from '../../common';
import { SimpleForm } from '../auth';
import { CenteredLoading9X9 } from '../ui';
import fond from '../../images/fond.jpg';
import messages_fr from '../../translations/fr.json';
import messages_en from '../../translations/en.json';
import { Menu as MenuIcon } from '../icons';
import { globalMenu } from './';

const intlMessages = {
  fr: messages_fr,
  en: messages_en,
};

export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  constructor(props) {
    super(props);
    this.onNavigate = this.onNavigate.bind(this);
    this.onLocaleChange = this.onLocaleChange.bind(this);
    this.onGeo = this.onGeo.bind(this);
  }

  componentDidMount() {
    initAxios();
    if (this.props.auth.authenticated) {
      this.props.actions.loadAll();
    } else {
      // Check auth...
      this.props.actions.checkIsAuthenticated();
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onGeo);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.auth.authenticated &&
      !nextProps.home.loadAllFinish &&
      !nextProps.home.loadAllError &&
      !nextProps.home.loadAllPending
    ) {
      initAxios(nextProps.auth.token);
      nextProps.actions.loadAll();
    }
  }

  onGeo(position) {
    if (position && position.coords) {
      this.props.actions.setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    }
  }

  onLocaleChange(locale) {
    this.props.actions.setLocale(locale);
  }

  onNavigate(url) {
    this.props.history.push(url);
  }

  render() {
    const locale = this.props.common.locale || 'fr';
    const messages = intlMessages[locale];
    if (this.props.home.loadAllError) {
      return (
        <IntlProvider locale={locale} messages={messages}>
          <div className="text-danger">
            <span>Erreur d'accès au service</span>
          </div>
        </IntlProvider>
      );
    } else {
      return (
        <IntlProvider locale={locale} messages={messages}>
          <img className="fond-site2 d-none d-sm-block" src={fond} alt="" />
          <ResponsivePage
            menuIcon={<MenuIcon className="light" />}
            title={process.env.REACT_APP_APP_NAME}
            options={globalMenu}
            authenticated={this.props.auth.authenticated}
            location={this.props.location}
            onNavigate={this.onNavigate}
            locales={[
              { code: 'fra', locale: 'fr', label: 'Français' },
              { code: 'gbr', locale: 'en', label: 'Royaume-Uni' },
            ]}
            currentLocale={locale}
            onLocale={this.onLocaleChange}
            userForm={<SimpleForm />}
            userTitle={this.props.auth.user.user_first_name || this.props.auth.user.user_first_name}
          >
            {!this.props.auth.authenticated || this.props.home.loadAllFinish ? (
              <div>{this.props.children}</div>
            ) : (
              <div className="text-center mt-5 text-secondary">
                <h4>... Chargement ...</h4>
                <CenteredLoading9X9 />
              </div>
            )}
          </ResponsivePage>
        </IntlProvider>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    auth: state.auth,
    common: state.common,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...authActions, ...commonActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
