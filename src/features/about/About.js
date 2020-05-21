import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Copyright } from '../ui';
import logo from '../../images/logo-timbre.png';

class About extends Component {
  static propTypes = {};

  render() {
    const { intl } = this.props;
    return (
      <div className="about-about container pt-5">
        <div className="jumbotron p-9 p-md-15 text-white rounded bg-primary">
          <div className="col-md-36 px-0">
            <h1 className="display-32 font-italic">
              <FormattedMessage
                id="app.features.about.about.application"
                defaultMessage="Kalaweit application"
              />
            </h1>
            <p className="lead my-24">
              <FormattedMessage
                id="app.features.about.about.explanation"
                defaultMessage="Only for Kalaweit"
              />
            </p>
            <p className="lead mb-0">
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-18"><img src={logo} alt="" /></div>
          <div className="col-md-18">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <div className="card-body d-flex flex-column align-items-start">
                <strong className="d-inline-block mb-2 text-primary">
                  <FormattedMessage
                    id="app.contact.name"
                    defaultMessage="KALAWEIT"
                  />
                  </strong>
                <h3 className="mb-0">
                  <a className="text-dark">
                    Contact
                  </a>
                </h3>
                <p className="card-text mb-auto">
                  <FormattedMessage
                    id="app.contact.contact"
                    defaultMessage="Constance Cluset"
                  />
                </p>
                <p className="card-text mb-auto">
                  <FormattedMessage
                    id="app.contact.address1"
                    defaultMessage="69 rue Mouffetard"
                  />
                </p>
                <p className="card-text mb-auto">
                  <FormattedMessage
                    id="app.contact.address2"
                    defaultMessage="75005 Paris"
                  />
                </p>
                <p className="card-text mb-auto">
                  <FormattedMessage
                    id="app.contact.tel"
                    defaultMessage="(+33) 07 86 01 18 87"
                  />
                </p>
                <p className="card-text mb-auto">
                  <a href={"mailto:" + intl.formatMessage({ id: 'app.contact.email', defaultMessage: 'kalaweit.france@yahoo.fr' })}>
                    <FormattedMessage
                      id="app.contact.email"
                      defaultMessage="kalaweit.france@yahoo.fr"
                    />
                  </a>
                </p>
                <a href={intl.formatMessage({ id: 'app.contact.site', defaultMessage: 'https://kalaweit.org' })} target="_blank" rel="noopener noreferrer">
                  <FormattedMessage
                    id="app.contact.site"
                    defaultMessage="https://kalaweit.org"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <Copyright />
      </div>
    );
  }
}

export default injectIntl(About);