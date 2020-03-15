import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { Loading9x9 } from 'freeassofront';
import Form from './Form';

/**
 * Modification d'un type de site
 */
export class Modify extends Component {
  static propTypes = {
    siteType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.sittId || this.props.match.params.id || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.id).then(result => {
      const item = this.props.siteType.loadOneItem;
      this.setState({ item: item });
    });
  }

  onCancel() {
    this.props.onClose();
  }

  onSubmit(datas = {}) {
    let obj = getJsonApi(datas, 'FreeAsso_SiteType', this.state.id);
    this.props.actions
      .updateOne(this.state.id, obj)
      .then(result => {
        this.props.actions.propagateModel('FreeAsso_SiteType', result);
        this.props.onClose();
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="site-type-modify global-card">
        {this.props.siteType.loadOnePending ? (
          <div className="text-center mt-2">
            <Loading9x9 />
          </div>
        ) : (
          <div>
            {item && 
              <Form 
                item={item} 
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
    siteType: state.siteType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));
