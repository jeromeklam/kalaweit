import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getJsonApi } from 'freejsonapi';
import { CenteredLoading9X9, modifySuccess, modifyError } from '../ui';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    donation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    /**
     * On récupère l'id et l'élément à afficher
     */
    this.state = {
      donationId: this.props.donId || false,
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
    let obj = getJsonApi(datas, 'FreeAsso_Donation', this.state.donationId);
    this.props.actions
      .updateOne(this.state.donationId, obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_Donation', result);
        this.props.onClose();
      })
      .catch(errors => {
        modifyError();
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="donation-modify global-card">
        {this.props.donation.loadOnePending ? (
          <div className="text-center mt-2">
            <CenteredLoading9X9 />
          </div>
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                donation={this.props.donation}
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
    donation: state.donation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions 
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modify);
