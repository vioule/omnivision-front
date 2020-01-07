import moment from 'moment';

import * as calendarSelectors from '../selectors';
import * as calendarConstants from '../constants';
import { initialState as calendarInitialState } from '../reducer';

const { NAME, ZOOM_LEVEL_WEEK } = calendarConstants;

describe('Calendar selectors', () => {
  let state;

  beforeAll(() => {
    state = {
      [NAME]: calendarInitialState,
    };
  });

  it('defines his selectors', () => {
    expect(calendarSelectors.calendarStateSelector).toBeDefined();
    expect(calendarSelectors.zoomLevelSelector).toBeDefined();
    expect(calendarSelectors.calendarDateSelector).toBeDefined();
  });

  it('has calendarStateSelector', () => {
    const selected = calendarSelectors.calendarStateSelector(state);
    const expectedResult = state[NAME];
    expect(selected).toEqual(expectedResult);
  });

  it('has zoomLevelSelector - initial state', () => {
    const selected = calendarSelectors.zoomLevelSelector(state);
    const expectedResult = state[NAME].zoomLevel;
    expect(selected).toEqual(expectedResult);
  });

  it('has zoomLevelSelector - other value', () => {
    const localState = {
      ...state,
      [NAME]: {
        ...state[NAME],
        zoomLevel: ZOOM_LEVEL_WEEK,
      },
    };
    const selected = calendarSelectors.zoomLevelSelector(localState);
    const expectedResult = ZOOM_LEVEL_WEEK;
    expect(selected).toEqual(expectedResult);
  });

  it('has calendarDateSelector - initial state', () => {
    const selected = calendarSelectors.calendarDateSelector(state);
    const expectedResult = state[NAME].date;
    expect(selected).toEqual(expectedResult);
  });

  it('has calendarDateSelector - other value', () => {
    const date = moment('2019-01-01');
    const localState = {
      ...state,
      [NAME]: {
        ...state[NAME],
        date,
      },
    };
    const selected = calendarSelectors.calendarDateSelector(localState);
    const expectedResult = date;
    expect(selected).toEqual(expectedResult);
  });
});
