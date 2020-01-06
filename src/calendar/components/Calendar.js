// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import type { Dispatch } from '../../core/models';
import * as calendarConstants from '../constants';
import * as calendarActions from '../actions';
import * as calendarSelectors from '../selectors';
import * as translationsHelpers from '../../translations/helpers';
import CalendarWeek from './CalendarWeek';
import CalendarMonth from './CalendarMonth';
import CalendarYear from './CalendarYear';
import Button from '../../shared/Button';

import '../styles/Calendar.scss';

type Props = {
  zoomLevel: string,
  selectZoomLevel: (zoomLevel: string) => void,
};

const { ZOOM_LEVELS } = calendarConstants;
const { translate } = translationsHelpers;

const Calendar = (props: Props) => {
  const { zoomLevel, selectZoomLevel } = props;

  const onClick = (zoom) => {
    selectZoomLevel(zoom);
  };

  return (
    <div className="calendar">

      <div className="zoom-levels">
        {ZOOM_LEVELS.map((zoom, index) => {
          const buttonProps = {
            key: index,
            className: zoomLevel === zoom ? 'active' : '',
            style: 'none',
            onClick: () => onClick(zoom),
          };
          return (
            <Button {...buttonProps}>{translate(zoom)}</Button>
          );
        })}
      </div>

      {zoomLevel === calendarConstants.ZOOM_LEVEL_WEEK && <CalendarWeek />}
      {zoomLevel === calendarConstants.ZOOM_LEVEL_MONTH && <CalendarMonth />}
      {zoomLevel === calendarConstants.ZOOM_LEVEL_YEAR && <CalendarYear />}
    </div>
  );
};

const mapState = (state: Object) => ({
  zoomLevel: calendarSelectors.zoomLevelSelector(state),
});

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
  selectZoomLevel: calendarActions.selectZoomLevel,
}, dispatch);

export { Calendar };
export default connect(mapState, mapDispatch)(Calendar);
