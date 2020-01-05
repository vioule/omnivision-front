// @flow
import moment from 'moment';

import * as calendarTypes from './actionTypes';

export const selectZoomLevel = (zoomLevel: string) => ({
  type: calendarTypes.SELECT_ZOOM_LEVEL,
  zoomLevel,
});

export const selectCalendarDate = (date: moment) => ({
  type: calendarTypes.SELECT_DATE,
  date,
});
