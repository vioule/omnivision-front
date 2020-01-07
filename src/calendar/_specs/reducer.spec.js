import moment from 'moment';

import calendarReducer, { initialState } from '../reducer';
import * as calendarTypes from '../actionTypes';
import * as calendarConstants from '../constants';

describe('Calendar reducer', () => {
  it('returns initial state', () => {
    const state = calendarReducer();
    expect(state).toEqual(initialState);
    expect(state.zoomLevel).toBeDefined();
    expect(state.zoomLevel).toEqual(calendarConstants.ZOOM_LEVEL_MONTH);
    expect(state.date).toBeDefined();
    expect(moment.isMoment(state.date)).toEqual(true);
  });

  it('returns state for non handled action', () => {
    const action = { type: 'TEST/ACTION' };
    const newState = calendarReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('handles update of zoom level', () => {
    const zoomLevel = calendarConstants.ZOOM_LEVEL_WEEK;
    const action = {
      type: calendarTypes.SELECT_ZOOM_LEVEL,
      zoomLevel,
    };
    const newState = calendarReducer(initialState, action);
    expect(newState.zoomLevel).toEqual(zoomLevel);
    expect(newState.date).toEqual(initialState.date);
  });

  it('handles update of date', () => {
    const date = moment('2019-01-01');
    const action = {
      type: calendarTypes.SELECT_DATE,
      date,
    };
    const newState = calendarReducer(initialState, action);
    expect(newState.zoomLevel).toEqual(initialState.zoomLevel);
    expect(newState.date).toEqual(date);
  });
});
