// @flow
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classnames from 'classnames';
import moment from 'moment';

import type { Dispatch } from '../../core/models';
import type { Project } from '../../project/models';
import * as calendarConstants from '../constants';
import * as calendarActions from '../actions';
import * as calendarSelectors from '../selectors';
import * as projectsSelectors from '../../project/selectors';
import IconArrowBack from '../../shared/Icons/IconArrowBack';
import IconArrowForward from '../../shared/Icons/IconArrowForward';
import * as translationsHelpers from '../../translations/helpers';

import '../styles/CalendarYear.scss';

type Props = {
  date: moment,
  projects: Array<Project>,
  selectDate: (date: moment) => void,
  selectZoomLevel: (zoomLevel: string) => void,
};

const { translate } = translationsHelpers;
const yearMonth = moment.monthsShort();

class CalendarYear extends PureComponent<Props> {
  goBack = (): void => {
    const { date, selectDate } = this.props;
    const newDate = moment(date).subtract(1, 'years');
    selectDate(newDate);
  };

  goForward = (): void => {
    const { date, selectDate } = this.props;
    const newDate = moment(date).add(1, 'years');
    selectDate(newDate);
  };

  updateDate = (date: moment): void => {
    const { selectDate, selectZoomLevel } = this.props;
    selectDate(date);
    selectZoomLevel(calendarConstants.ZOOM_LEVEL_MONTH);
  };

  render() {
    const { date, projects } = this.props;

    const months = yearMonth.map((month) => ({
      label: translate(`date.month.short.${month}`),
      date: moment(date).month(month),
    }));

    return (
      <div className="calendar-year">
        <Row className="calendar-nav">
          <Col xs={3}>
            <IconArrowBack className="calendar-icon" onClick={this.goBack} />
          </Col>
          <Col xs={6}>
            <div className="calendar-nav-value">
              <span className="calendar-nav-label">
                {date.format('YYYY')}
              </span>
              <span className="calendar-nav-description"> </span>
            </div>
          </Col>
          <Col xs={3}>
            <IconArrowForward className="calendar-icon" onClick={this.goForward} />
          </Col>
        </Row>

        <div className="calendar-table">
          <Row className="calendar-header">
            <div className="project-name" />
            {months.map((month, index) => (
              <div
                key={index}
                className="calendar-cell"
                onClick={() => this.updateDate(month.date)}
              >
                {month.label}.
              </div>
            ))}
          </Row>
          {projects.map((project, indexProject) => {
            const startProject = moment(project.startDate).startOf('day');
            const endProject = moment(project.endDate).startOf('day');
            return (
              <Row className="calendar-row" key={indexProject}>
                <div className="project-name">{project.name}</div>
                {months.map((month, indexWeek) => {
                  const classname = classnames({
                    'calendar-cell': true,
                    active: month.date.isBetween(startProject, endProject, null, '[]'),
                  });
                  return (
                    <div key={indexWeek} className={classname} />
                  );
                })}
              </Row>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = (state: Object) => ({
  date: calendarSelectors.calendarDateSelector(state),
  projects: projectsSelectors.projectsCollectionSelector(state),
});

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
  selectDate: calendarActions.selectCalendarDate,
  selectZoomLevel: calendarActions.selectZoomLevel,
}, dispatch);

export { CalendarYear };
export default connect(mapState, mapDispatch)(CalendarYear);
