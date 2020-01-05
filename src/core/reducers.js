import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as calendar from '../calendar';
import * as projects from '../project';

export default combineReducers({
  [calendar.NAME]: calendar.reducer,
  [projects.NAME]: projects.reducer,
  routing: routerReducer,
});
