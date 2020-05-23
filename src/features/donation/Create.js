import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { getJsonApi } from 'freejsonapi';
import { loadOne as loadOneCause } from '../cause/redux/actions';
import { loadOne as loadOneClient } from '../client/redux/actions';
import { CenteredLoading3Dots, createSuccess, showErrors } from '../ui';
import { propagateModel } from '../../common';
import Form from './Form';

export class Create extends Component {
  static propTypes = {
    donation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultProps = {
    loader: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      donationId: 0,
      item: false,
    };
    /**
     * Bind des méthodes locales au contexte courant
     */
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    /**
     *  En async on va demander le chargement des données
     *  Lorsque fini le store sera modifié
     */
    this.props.actions.loadOne(this.state.donationId).then(result => {
      const item = this.props.donation.loadOneItem;
      if (this.props.mode === 'client') {
        this.props.actions.loadOneClient(this.props.parentId).then(result => {
          item.client = this.props.client.loadOneItem;
          this.setState({ item: item });
        });
      } else {
        if (this.props.mode === 'cause') {
          this.props.actions.loadOneCause(this.props.parentId).then(result => {
            item.cause = this.props.cause.loadOneItem;
            this.setState({ item: item });
          });
        } else {
          this.setState({ item: item });
        }
      }
    });
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   * Sur erreur faut afficher les messages d'anomalie
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_Donation', this.state.donationId);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_Donation', result);
        this.props.onClose();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors);
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="donation-create global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                modal={true}
                inputMoney={this.props.inputMoney || 'EUR'}
                dbMoney={'EUR'}
                paymentTypes={this.props.paymentType.items}
                sessions={this.props.session.items}
                errors={this.props.donation.createOneError}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
                onClose={this.props.onClose}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inputMoney: state.auth.inputMoney,
    displayMoney: state.auth.displayMoney,
    cause: state.cause,
    client: state.client,
    donation: state.donation,
    paymentType: state.paymentType,
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...actions, loadOneCause, loadOneClient, propagateModel },
      dispatch,
    ),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Create));
