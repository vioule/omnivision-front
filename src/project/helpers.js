// @flow
import moment from 'moment';

import type { Project } from './models';
import type { NavLink } from '../header/models';
import * as coreConstants from '../core/constants';

export const parseProjectsCollection = (collection: Array<Object>): Array<Project> => {
  if (!collection || !collection.length) return [];
  return collection.map((el) => {
    const resources = el.resources.map((resource) => ({
      name: resource.name,
      description: resource.description,
      days: parseInt(resource.days, 10),
    }));

    return {
      id: parseInt(el.id, 10),
      name: el.name,
      description: el.description,
      startDate: moment(el.startDate).startOf('day'),
      endDate: moment(el.endDate).startOf('day'),
      days: parseInt(el.days, 10),
      resources,
    };
  });
};

export const convertProjectsAsNavLinks = (projects: Array<Object>): Array<NavLink> => {
  if (!projects || !projects.length) return [];
  return projects.map((project) => ({
    label: project.name,
    link: `${coreConstants.PATHS.PROJECT}/${project.id}`,
  }));
};
