import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { getJsonApi } from 'freejsonapi';
import { CenteredLoading3Dots, modifySuccess, showErrors } from '../ui';
import { propagateModel } from '../../common';
import Form from './Form';

export class Modify extends Component {
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
    /**
     * On récupère l'id et l'élément à afficher
     */
    this.state = {
      id: props.donId,
      donation: props.donation,
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
    this.props.actions.loadOne(this.state.id).then(result => {
      const item = this.props.donation.loadOneItem;
      this.setState({ item: item });
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
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_Donation', this.state.donId);
    this.props.actions
      .updateOne(this.state.id, obj)
      .then(result => {
        modifySuccess();
        console.log('test');
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
      <div className="donation-modify global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                modal={true}
                modify={true}
                inputMoney={item.don_money_input || 'EUR'}
                dbMoney={'EUR'}
                donation={this.props.donation}              
                paymentTypes={this.props.paymentType.items}
                sessions={this.props.session.items}
                errors={this.props.donation.updateOneError}
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
    donation: state.donation,
    paymentType: state.paymentType,
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Modify));
