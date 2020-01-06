import moment from 'moment';

import { initialState as projectInitialState } from '../reducer';
import * as projectSelectors from '../selectors';
import * as projectConstants from '../constants';
import * as projectHelpers from '../helpers';
import mockProjects from './mocks/projects.json';

const { NAME, ZOOM_LEVEL_WEEK } = projectConstants;
const parsedMockProjects = projectHelpers.parseProjectsCollection(mockProjects);

describe('Project selectors', () => {
  let state;

  beforeAll(() => {
    state = {
      [NAME]: projectInitialState,
    };
  });

  it('defines his selectors', () => {
    expect(projectSelectors.projectsStateSelector).toBeDefined();
    expect(projectSelectors.projectsSelector).toBeDefined();
    expect(projectSelectors.projectsCollectionSelector).toBeDefined();
    expect(projectSelectors.projectsNavBarSelector).toBeDefined();
  });

  it('has projectsStateSelector', () => {
    const selected = projectSelectors.projectsStateSelector(state);
    const expectedResult = state[NAME];
    expect(selected).toEqual(expectedResult);
  });

  it('has projectsSelector - initial state', () => {
    const selected = projectSelectors.projectsSelector(state);
    const expectedResult = state[NAME].projects;
    expect(selected).toEqual(expectedResult);
  });

  it('has projectsSelector - other value', () => {
    const projects = {
      isLoading: true,
      collection: parsedMockProjects,
      error: null,
    };
    const localState = {
      ...state,
      [NAME]: {
        ...state[NAME],
        projects,
      },
    };
    const selected = projectSelectors.projectsSelector(localState);
    const expectedResult = projects;
    expect(selected).toEqual(expectedResult);
  });

  it('has projectsCollectionSelector - initial state', () => {
    const selected = projectSelectors.projectsCollectionSelector(state);
    const expectedResult = state[NAME].projects.collection;
    expect(selected).toEqual(expectedResult);
  });

  it('has projectsCollectionSelector - with projects', () => {
    const localState = {
      ...state,
      [NAME]: {
        ...state[NAME],
        projects: {
          ...state[NAME].projects,
          collection: parsedMockProjects,
        },
      },
    };
    const selected = projectSelectors.projectsCollectionSelector(localState);
    const expectedResult = parsedMockProjects;
    expect(selected).toEqual(expectedResult);
  });

  it('has projectsNavBarSelector - initial state', () => {
    const selected = projectSelectors.projectsNavBarSelector(state);
    const expectedResult = [...projectConstants.NAV_LIST_DEFAULT];
    expect(selected).toEqual(expectedResult);
  });

  it('has projectsNavBarSelector - with projects', () => {
    const navLinks = [
      ...projectConstants.NAV_LIST_DEFAULT,
      ...projectHelpers.convertProjectsAsNavLinks(parsedMockProjects),
    ];
    const localState = {
      ...state,
      [NAME]: {
        ...state[NAME],
        projects: {
          ...state[NAME].projects,
          collection: parsedMockProjects,
        },
      },
    };
    const selected = projectSelectors.projectsNavBarSelector(localState);
    const expectedResult = navLinks;
    expect(selected).toEqual(expectedResult);
  });
});
