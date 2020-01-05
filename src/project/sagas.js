import { takeEvery, put } from 'redux-saga/effects';

import * as projectTypes from './actionTypes';
import * as projectActions from './actions';
import mockProjects from './specs/mocks/projects.json';

function* returnsMockProjects() {
  yield put(projectActions.receiveProjectsList(mockProjects));
}

export default function* saga() {
  yield takeEvery(projectTypes.GET_PROJECTS_REQUEST, returnsMockProjects);
}
