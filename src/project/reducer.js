// @flow
import type { State } from './models';
import * as projectTypes from './actionTypes';
import * as projectHelpers from './helpers';

export const initialState: State = {
  projects: {
    isLoading: false,
    collection: [],
    error: null,
  },
};

export const getProjectRequest = (state: State): State => ({
  ...state,
  projects: {
    ...state.projects,
    isLoading: false,
  },
});

export const getProjectResponse = (state: State, action: Object): State => ({
  ...state,
  projects: {
    ...state.projects,
    isLoading: false,
    collection: projectHelpers.parseProjectsCollection(action.payload),
  },
});

export const getProjectFailed = (state: State, action: Object): State => ({
  ...state,
  projects: {
    ...state.projects,
    isLoading: false,
    error: action.payload,
  },
});

export const actionReducer = {
  [projectTypes.GET_PROJECTS_REQUEST]: getProjectRequest,
  [projectTypes.GET_PROJECTS_RESPONSE]: getProjectResponse,
  [projectTypes.GET_PROJECTS_FAILED]: getProjectFailed,
};

export default (state: State = initialState, action: Object = {}): State => (
  !!actionReducer[action.type]
    ? actionReducer[action.type](state, action)
    : state
);
