import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, showErrors, createSuccess } from '../ui';
import Form from './Form';

export class Create extends Component {
  static propTypes = {
    paymentType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultprops = {
    loader: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      ptypId: 0,
      item: false,
      loading: true,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.ptypId).then(result => {
      const item = this.props.paymentType.loadOneItem;
      this.setState({ item: item, loading: false });
    });
  }

  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  }

  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_PaymentType', this.state.ptypId);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_PaymentType', result);
        this.props.onClose();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors);
      });
  }

  render() {
    const { item }  = this.state;
    return (
      <div className="paymentType-create global-card">
       {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && 
              <Form 
                item={item} 
                datas={this.props.data.items}
                config={this.props.config.items}
                properties={this.props.paymentType.properties}
                errors={this.props.paymentType.createOneError}
                onSubmit={this.onSubmit} 
                onCancel={this.onCancel} 
                onClose={this.props.onClose}
              />
            }
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    paymentType: state.paymentType,
    data: state.data,
    config: state.config,
    paymentTypeType: state.paymentTypeType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(Create)));
