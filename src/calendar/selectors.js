import { createSelector } from 'reselect';
import moment from 'moment';

import * as calendarConstants from './constants';

export const calendarStateSelector = (state) => state[calendarConstants.NAME];

export const zoomLevelSelect = createSelector(
  calendarStateSelector,
  (state) => state.zoomLevel
);

export const calendarDateSelector = createSelector(
  calendarStateSelector,
  (state) => moment(state.date)
);
