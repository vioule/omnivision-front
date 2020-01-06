import moment from 'moment';

import * as calendarConstants from '../constants';
import * as calendarActions from '../actions';
import * as calendarTypes from '../actionTypes';

describe('Calendar actions', () => {
  it('defines actions', () => {
    expect(calendarActions.selectZoomLevel).toBeDefined();
    expect(calendarActions.selectCalendarDate).toBeDefined();
  });

  it('selectZoomLevel', () => {
    const zoomLevel = calendarConstants.ZOOM_LEVEL_WEEK;
    const expectedAction = {
      type: calendarTypes.SELECT_ZOOM_LEVEL,
      zoomLevel,
    };
    const action = calendarActions.selectZoomLevel(zoomLevel);
    expect(action).toEqual(expectedAction);
  });

  it('selectCalendarDate', () => {
    const date = moment();
    const expectedAction = {
      type: calendarTypes.SELECT_DATE,
      date,
    };
    const action = calendarActions.selectCalendarDate(date);
    expect(action).toEqual(expectedAction);
  });
});
