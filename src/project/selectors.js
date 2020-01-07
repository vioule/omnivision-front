import { createSelector } from 'reselect';

import * as projectConstants from './constants';
import * as projectHelpers from './helpers';

export const projectsStateSelector = (state) => state[projectConstants.NAME];

export const projectsSelector = createSelector(
  projectsStateSelector,
  (state) => state.projects
);

export const projectsCollectionSelector = createSelector(
  projectsSelector,
  (projects) => projects.collection || []
);

export const projectsNavBarSelector = createSelector(
  projectsCollectionSelector,
  (projects) => (
    [
      ...projectConstants.NAV_LIST_DEFAULT,
      ...projectHelpers.convertProjectsAsNavLinks(projects),
    ]
  )
);
