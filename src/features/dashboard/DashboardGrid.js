import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import * as actions from './redux/actions';
import {
  Site as SiteIcon,
  Cause as CauseIcon,
  Friend as FriendIcon,
  Donation as DonationIcon,
} from '../icons';
import { DashboardCard, DashboardToolbar } from './';
import { getFromLS, saveToLS } from '../ui';
import { DashboardJobqueues } from '../jobqueue';

const getLayoutSize = (layouts, breakpoint, key) => {
  let size = 'sm';
  const layoutBr = layouts[breakpoint] || [];
  if (Array.isArray(layoutBr)) {
    const layout = layoutBr.find(elem => elem.i === key);
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
  }
  return size;
};

const ResponsiveReactGridLayout = WidthProvider(Responsive, { measureBeforeMount: true });

export class DashboardGrid extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const originalLayouts = props.auth.cache || getFromLS('layouts') || {};
    this.state = {
      breakpoint: 'lg',
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  onLayoutChange(layout, layouts) {
    saveToLS('layouts', layouts);
    this.setState({ layouts });
  }

  onBreakpointChange(breakpoint) {
    this.setState({ breakpoint });
  }

  render() {
    const { layouts, breakpoint } = this.state;
    if (this.props.auth.authenticated && this.props.dashboard.stats) {
      return (
        <div>
          <DashboardToolbar />
          <ResponsiveReactGridLayout
            className="layout"
            cols={{ lg: 36, md: 36, sm: 36, xs: 36, xxs: 36 }}
            rowHeight={30}
            verticalCompact={true}
            onResize={this.onResize}
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            layouts={layouts}
          >
            <div key="friends" data-grid={{ w: 6, h: 5, x: 14, y: 1, minW: 6, maxW: 18, minH: 4 }}>
              <DashboardCard
                title="Amis"
                count={this.props.dashboard.stats.friends}
                icon={<FriendIcon />}
                size={getLayoutSize(layouts, breakpoint, 'friends')}
              />
            </div>
            <div key="donations" data-grid={{ w: 6, h: 5, x: 21, y: 1, minW: 6, maxW: 18, minH: 4 }}>
              <DashboardCard
                title="Donations"
                count={this.props.dashboard.stats.donations}
                icon={<DonationIcon />}
                size={getLayoutSize(layouts, breakpoint, 'donations')}
              />
            </div>
            <div key="jobqueues" data-grid={{ w: 18, h: 5, x: 0, y: 5, minW: 18, maxW: 36, minH: 5 }}>
              <DashboardJobqueues />
            </div>
          </ResponsiveReactGridLayout>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGrid);
