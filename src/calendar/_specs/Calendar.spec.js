import React from 'react';
import { shallow } from 'enzyme';

import { Calendar } from '../components/Calendar';
import * as calendarConstants from '../constants';

describe('Calendar component', () => {
  let component;

  const props = {
    zoomLevel: calendarConstants.ZOOM_LEVEL_MONTH,
    selectZoomLevel: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<Calendar {...props} />);
    jest.clearAllMocks();
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('renders the expected component', () => {
    expect(component.find('.calendar').length).toEqual(1);
    expect(component.find('.zoom-levels').length).toEqual(1);
    expect(component.find('Button').length).toEqual(calendarConstants.ZOOM_LEVELS.length);
    expect(component.find('Connect(CalendarWeek)').length).toEqual(0);
    expect(component.find('Connect(CalendarMonth)').length).toEqual(1);
    expect(component.find('Connect(CalendarYear)').length).toEqual(0);
  });

  it('renders the week calendar', () => {
    const localProps = {
      ...props,
      zoomLevel: calendarConstants.ZOOM_LEVEL_WEEK,
    };
    component = shallow(<Calendar {...localProps} />);
    expect(component.find('.calendar').length).toEqual(1);
    expect(component.find('.zoom-levels').length).toEqual(1);
    expect(component.find('Button').length).toEqual(calendarConstants.ZOOM_LEVELS.length);
    expect(component.find('Connect(CalendarWeek)').length).toEqual(1);
    expect(component.find('Connect(CalendarMonth)').length).toEqual(0);
    expect(component.find('Connect(CalendarYear)').length).toEqual(0);
  });

  it('renders the month calendar', () => {
    const localProps = {
      ...props,
      zoomLevel: calendarConstants.ZOOM_LEVEL_MONTH,
    };
    component = shallow(<Calendar {...localProps} />);
    expect(component.find('.calendar').length).toEqual(1);
    expect(component.find('.zoom-levels').length).toEqual(1);
    expect(component.find('Button').length).toEqual(calendarConstants.ZOOM_LEVELS.length);
    expect(component.find('Connect(CalendarWeek)').length).toEqual(0);
    expect(component.find('Connect(CalendarMonth)').length).toEqual(1);
    expect(component.find('Connect(CalendarYear)').length).toEqual(0);
  });

  it('renders the year calendar', () => {
    const localProps = {
      ...props,
      zoomLevel: calendarConstants.ZOOM_LEVEL_YEAR,
    };
    component = shallow(<Calendar {...localProps} />);
    expect(component.find('.calendar').length).toEqual(1);
    expect(component.find('.zoom-levels').length).toEqual(1);
    expect(component.find('Button').length).toEqual(calendarConstants.ZOOM_LEVELS.length);
    expect(component.find('Connect(CalendarWeek)').length).toEqual(0);
    expect(component.find('Connect(CalendarMonth)').length).toEqual(0);
    expect(component.find('Connect(CalendarYear)').length).toEqual(1);
  });

  it('allows to change of zoom level', () => {
    component.find('Button').first().simulate('click');
    expect(props.selectZoomLevel).toHaveBeenCalled();
    expect(props.selectZoomLevel).toHaveBeenCalledTimes(1);
    expect(props.selectZoomLevel).toHaveBeenCalledWith(calendarConstants.ZOOM_LEVELS[0]);
  });

  it('shows the active zoom level', () => {
    expect(component.find('Button').length).toEqual(calendarConstants.ZOOM_LEVELS.length);
    expect(component.find('.active').length).toEqual(1);
  });
});
