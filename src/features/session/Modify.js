import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, showErrors, modifySuccess } from '../ui';
import Form from './Form';

/**
 * Modification d'une session
 */
export class Modify extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultProps = {
    loader: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.sessId || this.props.match.params.id || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.id).then(result => {
      const item = this.props.session.loadOneItem;
      this.setState({ item: item });
    });
  }

  onCancel() {
    this.props.onClose();
  }

  onSubmit(datas = {}) {
    let obj = getJsonApi(datas, 'FreeAsso_Session', this.state.id);
    this.props.actions
      .updateOne(this.state.id, obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_Session', result);
        this.props.onClose();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors);
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="session-modify global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && 
              <Form 
                item={item} 
                errors={this.props.session.updateOneError}
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
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify)));
