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

import '../styles/CalendarMonth.scss';

type Props = {
  date: moment,
  projects: Array<Project>,
  selectDate: (date: moment) => void,
  selectZoomLevel: (zoomLevel: string) => void,
};

const { translate } = translationsHelpers;
const dateFormat = translate('date.format');

class CalendarMonth extends PureComponent<Props> {
  goBack = (): void => {
    const { date, selectDate } = this.props;
    const newDate = moment(date).subtract(1, 'months');
    selectDate(newDate);
  };

  goForward = (): void => {
    const { date, selectDate } = this.props;
    const newDate = moment(date).add(1, 'months');
    selectDate(newDate);
  };

  updateDate = (date: moment): void => {
    const { selectDate, selectZoomLevel } = this.props;
    selectDate(date);
    selectZoomLevel(calendarConstants.ZOOM_LEVEL_WEEK);
  };

  render() {
    const { date, projects } = this.props;

    const weeks = [];
    const startOfCurrentMonth = moment(date).startOf('month');
    const endOfCurrentMonth = moment(date).endOf('month');

    let weeksNumber = 0;
    if (startOfCurrentMonth.week() < endOfCurrentMonth.week()) {
      weeksNumber = endOfCurrentMonth.week() - startOfCurrentMonth.week();
    } else if (date.month() === 11) { // Last week of December
      const endOfMonth = endOfCurrentMonth.subtract(7, 'days').week();
      weeksNumber = endOfMonth - startOfCurrentMonth.week();
    } else { // First week of January
      weeksNumber = endOfCurrentMonth.week() - 1;
    }

    for (let i = 0; i <= weeksNumber; i++) {
      weeks.push({
        label: `${translate('date.week.short')} ${startOfCurrentMonth.week() + i}`,
        startDate: moment(startOfCurrentMonth).startOf('week').add(i, 'weeks'),
        endDate: moment(startOfCurrentMonth).startOf('week').add(i, 'weeks').add(7, 'days'),
      });
    }

    return (
      <div className="calendar-month">
        <Row className="calendar-nav">
          <Col xs={3}>
            <IconArrowBack className="calendar-icon" onClick={this.goBack} />
          </Col>
          <Col xs={6}>
            <div className="calendar-nav-value">
              <span className="calendar-nav-label">
                {translate(`date.month.${date.format('MMMM')}`)}
              </span>
              <span className="calendar-nav-description">
                {startOfCurrentMonth.format(dateFormat)} - {endOfCurrentMonth.format(dateFormat)}
              </span>
            </div>
          </Col>
          <Col xs={3}>
            <IconArrowForward className="calendar-icon" onClick={this.goForward} />
          </Col>
        </Row>

        <div className="calendar-table">
          <Row className="calendar-header">
            <div className="project-name" />
            {weeks.map((week, index) => (
              <div
                key={index}
                className="calendar-cell"
                onClick={() => this.updateDate(week.startDate)}
              >
                {week.label}
              </div>
            ))}
          </Row>
          {projects.map((project, indexProject) => {
            const startProject = moment(project.startDate).startOf('day');
            const endProject = moment(project.endDate).startOf('day');
            return (
              <Row className="calendar-row" key={indexProject}>
                <div className="project-name">{project.name}</div>
                {weeks.map((week, indexWeek) => {
                  const classname = classnames({
                    'calendar-cell': true,
                    active: week.startDate.isBetween(startProject, endProject, null, '[]')
                      || week.endDate.isBetween(startProject, endProject, null, '[]'),
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

export { CalendarMonth };
export default connect(mapState, mapDispatch)(CalendarMonth);
