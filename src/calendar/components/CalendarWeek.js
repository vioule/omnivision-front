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
import * as calendarActions from '../actions';
import * as calendarSelectors from '../selectors';
import * as projectsSelectors from '../../project/selectors';
import IconArrowBack from '../../shared/Icons/IconArrowBack';
import IconArrowForward from '../../shared/Icons/IconArrowForward';
import * as translationsHelpers from '../../translations/helpers';
import DateHelpers from '../../shared/DateHelpers';

import '../styles/CalendarWeek.scss';

type Props = {
  date: moment,
  projects: Array<Project>,
  selectDate: (date: moment) => void,
};

const { translate } = translationsHelpers;
const weekDays = moment.weekdaysShort();
const dateFormat = translate('date.format');

class CalendarWeek extends PureComponent<Props> {
  goBack = () => {
    const { date, selectDate } = this.props;
    const newDate = moment(date).subtract(7, 'days');
    selectDate(newDate);
  };

  goForward = () => {
    const { date, selectDate } = this.props;
    const newDate = moment(date).add(7, 'days');
    selectDate(newDate);
  };

  render() {
    const { date, projects } = this.props;

    const currentWeekNumber = date.week();
    const startOfCurrentWeek = moment(date).startOf('week');
    const endOfCurrentWeek = moment(date).endOf('week');

    return (
      <div className="calendar-week">
        <Row className="calendar-nav">
          <Col xs={3}>
            <IconArrowBack className="calendar-icon" onClick={this.goBack} />
          </Col>

          <Col xs={6}>
            <div className="calendar-nav-value">
              <span className="calendar-nav-label">
                {translate('date.week')} {currentWeekNumber}
              </span>
              <span className="calendar-nav-description">
                {startOfCurrentWeek.format(dateFormat)} - {endOfCurrentWeek.format(dateFormat)}
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
            {weekDays.map((day, index) => (
              <div key={index} className="calendar-cell">
                <span>{translate(`date.day.${day}`)}.</span>
              </div>
            ))}
          </Row>

          {projects.map((project, indexProject) => {
            const startProject = moment(project.startDate);
            const endProject = moment(project.endDate);

            return (
              <Row className="calendar-row" key={indexProject}>
                <div className="project-name">{project.name}</div>
                {weekDays.map((day, indexWeek) => {
                  const currentDay = moment(startOfCurrentWeek).add(indexWeek, 'days');
                  const classname = classnames({
                    'calendar-cell': true,
                    active: currentDay.isBetween(startProject, endProject, null, '[]'),
                    disable: [0, 6].includes(indexWeek) || DateHelpers.isHoliday(currentDay),
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
}, dispatch);

export { CalendarWeek };
export default connect(mapState, mapDispatch)(CalendarWeek);
