import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GridLayout from 'react-grid-layout';
import { ResponsiveGridCard } from '../ui';
import * as actions from './redux/actions';
import {
  Site as SiteIcon,
  Cause as CauseIcon,
  Friend as FriendIcon,
  Donation as DonationIcon
} from '../icons';
import { DashboardCard } from './';

const initialLayout = [
  { i: 'causes', x: 0, y: 0, w: 6, h: 4, minW: 4, maxW: 12, minH: 2, maxH: 8 },
  { i: 'sites', x: 7, y: 0, w: 6, h: 4, minW: 4, maxW: 12, minH: 2, maxH: 8 },
  { i: 'friends', x: 15, y: 0, w: 6, h: 4, minW: 4, maxW: 12, minH: 2, maxH: 8 },
  { i: 'donations', x: 23, y: 0, w: 6, h: 4, minW: 4, maxW: 12, minH: 2, maxH: 8 },
];

const getLayoutSize = (layouts, key) => {
  let size = 'sm';
  const layout = layouts.find(elem => elem.i === key);
  if (layout) {
    if (layout.w < 9) {
      size = 'sm';
    } else {
      if (layout.w < 18) {
        size = 'md';
      } else {
        if (layout.w < 27) {
          size = 'lg';
        } else {
          size = 'xl';
        }
      }
    }
  }
  return size;
};

export class DashboardGrid extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      layouts: initialLayout,
    }
    this.onResize = this.onResize.bind(this);
  }

  onResize(layouts) {
    this.setState({ layouts: layouts });
  }

  render() {
    const { layouts } = this.state;
    if (this.props.auth.authenticated && this.props.dashboard.stats) {
      return (
        <GridLayout
          className="layout"
          cols={36}
          rowHeight={30}
          width={1200}
          verticalCompact={true}
          onResize={this.onResize}
          layout={layouts}
        >
          <div key="causes">
            <DashboardCard
              title="Causes"
              count={this.props.dashboard.stats.total_cause}
              icon={<CauseIcon />}
              url="/cause"
              size={getLayoutSize(layouts, 'cause')}
            />
          </div>
          <div key="sites">
            <DashboardCard
              title="Sites"
              count={this.props.dashboard.stats.total_site}
              icon={<SiteIcon />}
              url="/site"
              size={getLayoutSize(layouts, 'site')}
            />
          </div>
          <div key="friends">
            <DashboardCard
              title="Amis"
              count={this.props.dashboard.stats.friends}
              icon={<FriendIcon />}
              size={getLayoutSize(layouts, 'm2')}
            />
          </div>
          <div key="donations">
            <DashboardCard
              title="Donations"
              count={this.props.dashboard.stats.donations}
              icon={<DonationIcon />}
              size={getLayoutSize(layouts, 'm')}
            />
          </div>
        </GridLayout>
      );
    }
    return null;
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGrid);
