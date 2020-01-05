import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { StatCard } from './';
import { 
  Site as SiteIcon, 
  Cause as CauseIcon,
  Person as PersonIcon,
  Fence as FenceIcon
} from '../icons';

export class Stats extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="dashboard-stats ">
        {(this.props.auth.authenticated  && this.props.dashboard.stats) ? (
          <div className="row">
            <StatCard
              title="Animaux"
              count={this.props.dashboard.stats.total_cause}
              icon={<CauseIcon />}
              url="/cause"
            />
            <StatCard
              title="Sites"
              count={this.props.dashboard.stats.total_site}
              icon={<SiteIcon />}
              url="/site"
            />
            <StatCard
              title="Amis"
              count={this.props.dashboard.stats.friends}
              icon={<PersonIcon />}
              url="/client"
            />
            <StatCard
              title="Dons"
              count={this.props.dashboard.stats.donations}
              icon={<FenceIcon />}
            />
          </div>
        ) : (
          <div className="row"></div>
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
    auth: state.auth,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
