import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, createError, createSuccess } from '../ui';
import Form from './Form';

export class Create extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultprops = {
    loader: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      siteId: 0,
      item: false,
      loading: true,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.siteId).then(result => {
      const item = this.props.site.loadOneItem;
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
    let obj = getJsonApi(datas, 'FreeAsso_Site', this.state.siteId);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_Site', result);
        this.props.onClose();
      })
      .catch(errors => {
        createError();
      });
  }

  render() {
    const { item }  = this.state;
    return (
      <div className="site-type-create global-card">
       {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && 
              <Form 
                item={item} 
                datas={this.props.data.items}
                config={this.props.config.items}
                site_types={this.props.siteType.items} 
                properties={this.props.site.properties}
                errors={this.props.site.createOneError}
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
    site: state.site,
    data: state.data,
    config: state.config,
    siteType: state.siteType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create));
