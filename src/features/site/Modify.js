import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, modifyError, modifySuccess } from '../ui';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultProps = {
    loader: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.siteId || this.props.match.params.siteId || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.id).then(result => {
      const item = this.props.site.loadOneItem;
      this.setState({ item: item });
    });
  }

  onCancel() {
    this.props.onClose();
  }

  onSubmit(datas) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas);
    this.props.actions
      .updateOne(this.state.id, obj)
      .then(result => {
        // propagateModel est ajouté aux actions en bas de document
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_Site', result);
        this.props.onClose();
      })
      .catch(errors => {
        modifyError();
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="site-modify global-card">
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
                errors={this.props.site.updateOneError}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));
