import React, { Component } from 'react';
import { Copyright } from '../ui';
import logo from '../../images/logo-timbre.png';

export default class About extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="about-about container">
        <div className="jumbotron p-9 p-md-15 text-white rounded bg-primary">
          <div className="col-md-36 px-0">
            <h1 className="display-32 font-italic">Application de gestion pour Kalaweit</h1>
            <p className="lead my-24">
              Cette application est réservée à Kalaweit. Si vous souhaitez avoir plus
              d'informations merci d'utiliser les informations de contact ci-dessous.
            </p>
            <p className="lead mb-0">
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-18"><img src={logo} alt="logo" /></div>
          <div className="col-md-18">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <div className="card-body d-flex flex-column align-items-start">
                <strong className="d-inline-block mb-2 text-primary">Kalaweit</strong>
                <h3 className="mb-0">
                  <a className="text-dark">
                    Contact
                  </a>
                </h3>
                <p className="card-text mb-auto">69 rue Mouffetard</p>
                <p className="card-text mb-auto">75005 Paris</p>
                <p className="card-text mb-auto">(+33) 07 86 01 18 87</p>
                <p className="card-text mb-auto">
                  <a href="mailto:contact@lesecopattes.fr">kalaweit.france@yahoo.fr</a>
                </p>
                <a href="https://kalaweit.org" target="_blank" rel="noopener noreferrer">
                  Notre site internet
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
