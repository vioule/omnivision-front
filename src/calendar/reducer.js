// @flow
import moment from 'moment';

import type { State } from './models';
import * as calendarTypes from './actionTypes';

export const initialState: State = {
  zoomLevel: 'month',
  date: moment(),
};

export const selectZoomLevel = (state: State, action: Object): State => ({
  ...state,
  zoomLevel: action.zoomLevel,
});

export const selectDate = (state: State, action: Object): State => ({
  ...state,
  date: action.date,
});

export const actionReducer = {
  [calendarTypes.SELECT_ZOOM_LEVEL]: selectZoomLevel,
  [calendarTypes.SELECT_DATE]: selectDate,
};

export default (state: State = initialState, action: Object = {}): State => (
  !!actionReducer[action.type]
    ? actionReducer[action.type](state, action)
    : state
);
