import { createSelector } from 'reselect';

import * as coreConstants from '../core/constants';
import * as projectsConstants from './constants';

export const projectsStateSelector = (state) => state[projectsConstants.NAME];

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
  (projects) => {
    const navList = [...projectsConstants.NAV_LIST_DEFAULT];
    projects.forEach((project) => {
      navList.push({
        label: project.name,
        link: `${coreConstants.PATHS.PROJECT}/${project.id}`,
      });
    });
    return navList;
  }
);
