import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { CalendarYear } from '../components/CalendarYear';
import * as calendarConstants from '../constants';
import projects from '../../project/_specs/mocks/projects.json';
import * as translationsHelpers from '../../translations/helpers';

const { translate } = translationsHelpers;
const dateFormat = translate('date.format');

describe('CalendarYear component', () => {
  let component;

  const props = {
      date: moment('2019-01-01'),
      projects: projects,
      selectDate: jest.fn(),
      selectZoomLevel: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<CalendarYear {...props} />);
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

  it('allows to go one year before', () => {
    component.instance().goBack();
    const expectedDate = moment(props.date).subtract(1, 'years');
    expect(props.selectDate).toHaveBeenCalled();
    expect(props.selectDate).toHaveBeenCalledTimes(1);
    expect(props.selectDate).toHaveBeenCalledWith(expectedDate);
  });

  it('allows to go one year after', () => {
    component.instance().goForward();
    const expectedDate = moment(props.date).add(1, 'years');
    expect(props.selectDate).toHaveBeenCalled();
    expect(props.selectDate).toHaveBeenCalledTimes(1);
    expect(props.selectDate).toHaveBeenCalledWith(expectedDate);
  });

  it('allows to update date and change zoom level', () => {
    const expectedDate = moment(props.date).add(1, 'years');
    component.instance().updateDate(expectedDate);
    expect(props.selectDate).toHaveBeenCalled();
    expect(props.selectDate).toHaveBeenCalledTimes(1);
    expect(props.selectDate).toHaveBeenCalledWith(expectedDate);
    expect(props.selectZoomLevel).toHaveBeenCalled();
    expect(props.selectZoomLevel).toHaveBeenCalledTimes(1);
    expect(props.selectZoomLevel).toHaveBeenCalledWith(calendarConstants.ZOOM_LEVEL_MONTH);
  });

  it('renders the expected component', () => {
    const navLabel = moment(props.date).format('YYYY');
    expect(component.find('.calendar-year').length).toEqual(1);
    expect(component.find('.calendar-nav').length).toEqual(1);
    expect(component.find('IconArrowBack').length).toEqual(1);
    expect(component.find('IconArrowForward').length).toEqual(1);
    expect(component.find('.calendar-icon').length).toEqual(2);
    expect(component.find('.calendar-nav-value').length).toEqual(1);
    expect(component.find('.calendar-nav-label').length).toEqual(1);
    expect(component.find('.calendar-nav-label').text()).toEqual(navLabel);
    expect(component.find('.calendar-nav-description').length).toEqual(1);
    expect(component.find('.calendar-nav-description').text()).toEqual(' ');
    expect(component.find('.calendar-table').length).toEqual(1);
    expect(component.find('.calendar-header').length).toEqual(1);
    expect(component.find('.calendar-header .project-name').length).toEqual(1);
    expect(component.find('.calendar-header .calendar-cell').length).toEqual(12);
    expect(component.find('.calendar-row').length).toEqual(projects.length);
    expect(component.find('.calendar-row .project-name').length).toEqual(projects.length);
    expect(component.find('.calendar-row .calendar-cell').length).toEqual(projects.length * 12);
    expect(component.find('.calendar-row .active').length).toEqual(12);
  });
});
