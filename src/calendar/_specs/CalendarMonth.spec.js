import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { CalendarMonth } from '../components/CalendarMonth';
import * as calendarConstants from '../constants';
import projects from '../../project/_specs/mocks/projects.json';
import * as translationsHelpers from '../../translations/helpers';

const { translate } = translationsHelpers;
const dateFormat = translate('date.format');

describe('CalendarMonth component', () => {
  let component;

  const props = {
      date: moment('2019-01-01'),
      projects: projects,
      selectDate: jest.fn(),
      selectZoomLevel: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<CalendarMonth {...props} />);
    jest.clearAllMocks();
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('defines his methods', () => {
    expect(component.instance().goBack).toBeDefined();
    expect(component.instance().goForward).toBeDefined();
    expect(component.instance().updateDate).toBeDefined();
    expect(component.instance().render).toBeDefined();
  });

  it('allows to go one month before', () => {
    component.instance().goBack();
    const expectedDate = moment(props.date).subtract(1, 'months');
    expect(props.selectDate).toHaveBeenCalled();
    expect(props.selectDate).toHaveBeenCalledTimes(1);
    expect(props.selectDate).toHaveBeenCalledWith(expectedDate);
  });

  it('allows to go one month after', () => {
    component.instance().goForward();
    const expectedDate = moment(props.date).add(1, 'months');
    expect(props.selectDate).toHaveBeenCalled();
    expect(props.selectDate).toHaveBeenCalledTimes(1);
    expect(props.selectDate).toHaveBeenCalledWith(expectedDate);
  });

  it('allows to update date and change zoom level', () => {
    const expectedDate = moment(props.date).add(1, 'months');
    component.instance().updateDate(expectedDate);
    expect(props.selectDate).toHaveBeenCalled();
    expect(props.selectDate).toHaveBeenCalledTimes(1);
    expect(props.selectDate).toHaveBeenCalledWith(expectedDate);
    expect(props.selectZoomLevel).toHaveBeenCalled();
    expect(props.selectZoomLevel).toHaveBeenCalledTimes(1);
    expect(props.selectZoomLevel).toHaveBeenCalledWith(calendarConstants.ZOOM_LEVEL_WEEK);
  });

  it('renders the expected component', () => {
    const startOfMonth = moment(props.date).startOf('month').format(dateFormat);
    const endOfMonth = moment(props.date).endOf('month').format(dateFormat);
    const navLabel = translate(`date.month.${props.date.format('MMMM')}`);
    const navDescription = `${startOfMonth} - ${endOfMonth}`;
    expect(component.find('.calendar-month').length).toEqual(1);
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
    expect(component.find('.calendar-header .calendar-cell').length).toEqual(5);
    expect(component.find('.calendar-row').length).toEqual(projects.length);
    expect(component.find('.calendar-row .project-name').length).toEqual(projects.length);
    expect(component.find('.calendar-row .calendar-cell').length).toEqual(projects.length * 5);
    expect(component.find('.calendar-row .active').length).toEqual(5);
  });
});
