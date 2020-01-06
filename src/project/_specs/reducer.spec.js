import moment from 'moment';

import projectReducer, { initialState } from '../reducer';
import mockProjects from './mocks/projects.json';
import * as projectTypes from '../actionTypes';
import * as projectHelpers from '../helpers';

describe('Project reducer', () => {
  it('returns initial state', () => {
    const state = projectReducer();
    expect(state).toEqual(initialState);
    expect(state.projects).toBeDefined();
    expect(typeof state.projects).toEqual('object');
    expect(state.projects.isLoading).toBeDefined();
    expect(state.projects.isLoading).toEqual(false);
    expect(state.projects.collection).toBeDefined();
    expect(state.projects.collection).toEqual([]);
    expect(state.projects.error).toBeDefined();
    expect(state.projects.error).toEqual(null);
  });

  it('returns state for non handled action', () => {
    const action = { type: 'TEST/ACTION' };
    const newState = projectReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('handles update when requesting for projects', () => {
    const action = {
      type: projectTypes.GET_PROJECTS_REQUEST,
    };
    const newState = projectReducer(initialState, action);
    expect(newState.projects.isLoading).toEqual(true);
    expect(newState.projects.collection).toEqual([]);
    expect(newState.projects.error).toEqual(null);
  });

  it('handles update when received projects collection', () => {
    const action = {
      type: projectTypes.GET_PROJECTS_RESPONSE,
      payload: mockProjects,
    };
    const parsedProjects = projectHelpers.parseProjectsCollection(mockProjects);
    const newState = projectReducer(initialState, action);
    expect(newState.projects.isLoading).toEqual(false);
    expect(newState.projects.collection).toEqual(parsedProjects);
    expect(newState.projects.error).toEqual(null);
  });

  it('handles update when received projects error', () => {
    const error = 'test error';
    const action = {
      type: projectTypes.GET_PROJECTS_FAILED,
      payload: error,
    };
    const newState = projectReducer(initialState, action);
    expect(newState.projects.isLoading).toEqual(false);
    expect(newState.projects.collection).toEqual([]);
    expect(newState.projects.error).toEqual(error);
  });
});
