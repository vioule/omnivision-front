import * as projectActions from '../actions';
import * as projectTypes from '../actionTypes';
import mockProjects from './mocks/projects.json';

describe('Project actions', () => {
  it('defines actions', () => {
    expect(projectActions.getProjectsList).toBeDefined();
    expect(projectActions.receiveProjectsList).toBeDefined();
  });

  it('getProjectsList', () => {
    const expectedAction = {
      type: projectTypes.GET_PROJECTS_REQUEST,
    };
    const action = projectActions.getProjectsList();
    expect(action).toEqual(expectedAction);
  });

  it('receiveProjectsList', () => {
    const expectedAction = {
      type: projectTypes.GET_PROJECTS_RESPONSE,
      payload: mockProjects,
    };
    const action = projectActions.receiveProjectsList(mockProjects);
    expect(action).toEqual(expectedAction);
  });
});
