import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { loadOne as loadOneCause } from '../cause/redux/actions';
import { loadOne as loadOneClient } from '../client/redux/actions';
import Form from './Form';
import { getJsonApi } from 'freejsonapi';
import { CenteredLoading9X9, createSuccess, createError } from '../ui';

export class Create extends Component {
  static propTypes = {
    sponsorship: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    /**
     * On récupère l'id et l'élément à afficher
     */
    this.state = {
      spoId: 0,
      sponsorship: props.sponsorship,
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
    this.props.actions.loadOne(this.state.spoId).then(result => {
      const item = this.props.sponsorship.loadOneItem;
      if (this.props.mode === 'client') {
        this.props.actions.loadOneClient(this.props.parentId).then(result => {
          item.client = this.props.client.loadOneItem;
          this.setState({ item: item });
        })
      } else {
        if (this.props.mode === 'cause') {
          this.props.actions.loadOneCause(this.props.parentId).then(result => {
            item.cause = this.props.cause.loadOneItem;
            this.setState({ item: item });
          })
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
  onSubmit(datas) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_Sponsorship', this.state.spoId);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_Sponsoship', result);
        this.props.onClose();
      })
      .catch(errors => {
        createError();
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="sponsorship-create global-card">
        {this.props.sponsorship.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                modal={true}
                datas={this.props.data.items}
                configs={this.props.config.items}
                properties={this.props.sponsorship.properties}                
                errors={this.props.sponsorship.updateOneError}
                paymentTypes={this.props.paymentType.items}
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
    data: state.data,
    cause: state.cause,
    client: state.client,
    config: state.config,
    sponsorship: state.sponsorship,
    paymentType: state.paymentType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, loadOneClient, loadOneCause }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
