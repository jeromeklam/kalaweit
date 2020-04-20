import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from 'freejsonapi';

export class InlineSponsors extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    let sponsors = [];
    //if (this.props.cause.sponsors.FreeAsso_Sponsor) {
    //  sponsors = buildModel(this.props.cause.sponsors, 'FreeAsso_Sponsor');
    //}
    return (
      <div className="cause-inline-sponsors">
        Page Content: cause/InlineSponsors
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cause: state.cause,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InlineSponsors);
