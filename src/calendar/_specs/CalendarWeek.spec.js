import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { CalendarWeek } from '../components/CalendarWeek';
import * as calendarConstants from '../constants';
import projects from '../../project/_specs/mocks/projects.json';
import * as translationsHelpers from '../../translations/helpers';

const { translate } = translationsHelpers;
const dateFormat = translate('date.format');

describe('CalendarWeek component', () => {
  let component;

  const props = {
      date: moment('2019-01-01'),
      projects: projects,
      selectDate: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<CalendarWeek {...props} />);
    jest.clearAllMocks();
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('defines his methods', () => {
    expect(component.instance().goBack).toBeDefined();
    expect(component.instance().goForward).toBeDefined();
    expect(component.instance().render).toBeDefined();
  });

  it('allows to go one month before', () => {
    component.instance().goBack();
    const expectedDate = moment(props.date).subtract(7, 'days');
    expect(props.selectDate).toHaveBeenCalled();
    expect(props.selectDate).toHaveBeenCalledTimes(1);
    expect(props.selectDate).toHaveBeenCalledWith(expectedDate);
  });

  it('allows to go one month after', () => {
    component.instance().goForward();
    const expectedDate = moment(props.date).add(7, 'days');
    expect(props.selectDate).toHaveBeenCalled();
    expect(props.selectDate).toHaveBeenCalledTimes(1);
    expect(props.selectDate).toHaveBeenCalledWith(expectedDate);
  });

  it('renders the expected component', () => {
    const startOfMonth = moment(props.date).startOf('week').format(dateFormat);
    const endOfMonth = moment(props.date).endOf('week').format(dateFormat);
    const navLabel = `${translate('date.week')} ${props.date.week()}`;
    const navDescription = `${startOfMonth} - ${endOfMonth}`;
    expect(component.find('.calendar-week').length).toEqual(1);
    expect(component.find('.calendar-nav').length).toEqual(1);
    expect(component.find('IconArrowBack').length).toEqual(1);
    expect(component.find('IconArrowForward').length).toEqual(1);
    expect(component.find('.calendar-icon').length).toEqual(2);
    expect(component.find('.calendar-nav-value').length).toEqual(1);
    expect(component.find('.calendar-nav-label').length).toEqual(1);
    expect(component.find('.calendar-nav-label').text()).toEqual(navLabel);
    expect(component.find('.calendar-nav-description').length).toEqual(1);
    expect(component.find('.calendar-nav-description').text()).toEqual(navDescription);
    expect(component.find('.calendar-table').length).toEqual(1);
    expect(component.find('.calendar-header').length).toEqual(1);
    expect(component.find('.calendar-header .project-name').length).toEqual(1);
    expect(component.find('.calendar-header .calendar-cell').length).toEqual(7);
    expect(component.find('.calendar-row').length).toEqual(projects.length);
    expect(component.find('.calendar-row .project-name').length).toEqual(projects.length);
    expect(component.find('.calendar-row .calendar-cell').length).toEqual(projects.length * 7);
    expect(component.find('.calendar-row .active').length).toEqual(7);
  });
});
