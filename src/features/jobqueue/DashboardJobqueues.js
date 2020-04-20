import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { buildModel } from 'freejsonapi';
import { displayDatetime } from 'freeassofront';
import { DashboardCard } from '../dashboard';
import * as actions from './redux/actions';
import { injectIntl } from 'react-intl';
import { InlineList, Line, Col } from '../ui';
import { Jobqueue as JobqueueIcon } from '../icons';
import { getStatusLabel as getJobqueueStatusLabel } from './';

export class DashboardJobqueues extends Component {
  static propTypes = {
    jobqueue: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { intl } = this.props;
    let counter = 0;
    let jobqueues = [];
    if (this.props.jobqueue.items.FreeFW_Jobqueue) {
      jobqueues = buildModel(this.props.jobqueue.items, 'FreeFW_Jobqueue');
    }
    return (
      <DashboardCard title="Tâches planifiées" icon={<JobqueueIcon />} size="md">
        <div>
          <div className="cause-movement-pendings text-secondary bg-secondary-light">
            {jobqueues && jobqueues.length > 0 ? (
              <InlineList>
                <Line header oddEven={counter}>
                  <Col layoutSize={this.props.layoutSize || 'md'} md={16} lg={9} xl={9} col={16}>
                    <span>Nom</span>
                  </Col>
                  <Col layoutSize={this.props.layoutSize || 'md'} md={10} lg={9} xl={9} col={20}>
                    <span>Status</span>
                  </Col>
                  <Col layoutSize={this.props.layoutSize || 'md'} md={10} lg={9} xl={9} col={16}>
                    <span>Prochain</span>
                  </Col>
                </Line>
                {jobqueues.map(jobqueue => {
                  counter++;
                  return (
                    <Line oddEven={counter} key={`pending-${jobqueue.id}`}>
                      <Col layoutSize={this.props.layoutSize || 'md'} md={16} lg={9} xl={9} col={16}>
                        <span>{jobqueue.jobq_name}</span>
                      </Col>
                      <Col layoutSize={this.props.layoutSize || 'md'} md={10} lg={9} xl={9} col={16}>
                        <span>{getJobqueueStatusLabel(intl, jobqueue.jobq_status)}</span>
                      </Col>
                      <Col layoutSize={this.props.layoutSize || 'md'} md={10} lg={9} xl={9} col={16}>
                        <span>{displayDatetime(jobqueue.jobq_next_retry)}</span>
                      </Col>
                    </Line>
                  );
                })}
              </InlineList>
            ) : (
              <div>
                <span className="p-3">Aucune tâche planifiée</span>
              </div>
            )}
          </div>
        </div>
      </DashboardCard>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    jobqueue: state.jobqueue,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardJobqueues));
