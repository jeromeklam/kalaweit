import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { Loading9x9 } from 'freeassofront';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    /**
     * On récupère l'id et l'élément à afficher
     */
    this.state = {
      clientId: this.props.match.params.clientId || false,
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
    
    this.props.actions.loadOne(this.state.clientId).then(result => {
      const item = this.props.client.loadOneItem;
      this.setState({ item: item });
    });
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel() {
    this.props.history.push('/client');
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_Client', this.state.clientId);
    this.props.actions
      .updateOne(this.state.clientId, obj)
      .then(result => {
        // @Todo propagate result to store
        // propagateModel est ajouté aux actions en bas de document
        this.props.actions.propagateModel('FreeAsso_Client', result);
        this.props.history.push('/client');
      })
      .catch(errors => {
        // @todo display errors to fields
        console.log(errors);
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="client-modify global-card">
        {this.props.client.loadOnePending ? (
          <div className="text-center mt-2">
            <Loading9x9 />
          </div>
        ) : (
          <div>
            {item && (
              <Form
                tabs={this.props.client.tabs}
                tab={this.props.client.tab}
                item={item}
                client_types={this.props.clientType.items}
                client_categories={this.props.clientCategory.items}
                countries={this.props.country.items}
                languages={this.props.lang.items}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
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
    client: state.client,
    clientType: state.clientType,
    clientCategory: state.clientCategory,
    country: state.country,
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modify);
