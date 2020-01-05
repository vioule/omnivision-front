import * as projectTypes from './actionTypes';

export const getProjectsList = () => ({
  type: projectTypes.GET_PROJECTS_REQUEST,
});

export const receiveProjectsList = (projects) => ({
  type: projectTypes.GET_PROJECTS_RESPONSE,
  payload: projects,
});
