import moment from 'moment';

import * as coreConstants from '../../core/constants';
import * as projectHelpers from '../helpers';
import * as projectTypes from '../actionTypes';
import mockProjects from './mocks/projects.json';

describe('Project helpers', () => {
  it('defines methods', () => {
    expect(projectHelpers.parseProjectsCollection).toBeDefined();
    expect(projectHelpers.convertProjectsAsNavLinks).toBeDefined();
  });

  it('has method to parse projects', () => {
    const firstResource = {
      name: mockProjects[0].resources[0].name,
      description: mockProjects[0].resources[0].description,
      days: parseInt(mockProjects[0].resources[0].days, 10),
    };
    const parsed = projectHelpers.parseProjectsCollection(mockProjects);
    expect(parsed.length).toEqual(mockProjects.length);
    expect(parsed[0].id).toBeDefined();
    expect(parsed[0].id).toEqual(parseInt(mockProjects[0].id, 10));
    expect(parsed[0].name).toBeDefined();
    expect(parsed[0].name).toEqual(mockProjects[0].name);
    expect(parsed[0].description).toBeDefined();
    expect(parsed[0].description).toEqual(mockProjects[0].description);
    expect(parsed[0].startDate).toBeDefined();
    expect(parsed[0].startDate.format()).toEqual(moment(mockProjects[0].startDate).startOf('day').format());
    expect(parsed[0].endDate).toBeDefined();
    expect(parsed[0].endDate.format()).toEqual(moment(mockProjects[0].endDate).startOf('day').format());
    expect(parsed[0].days).toBeDefined();
    expect(parsed[0].days).toEqual(parseInt(mockProjects[0].days, 10));
    expect(parsed[0].resources).toBeDefined();
    expect(parsed[0].resources.length).toEqual(mockProjects[0].resources.length);
    expect(parsed[0].resources[0]).toEqual(firstResource);
  });

  it('has method to convert projects as nav links', () => {
    const navLinks = projectHelpers.parseProjectsCollection(mockProjects).map((project) => ({
      label: project.name,
      link: `${coreConstants.PATHS.PROJECT}/${project.id}`,
    }));
    const parsed = projectHelpers.convertProjectsAsNavLinks(mockProjects);
    expect(parsed).toEqual(navLinks);
    expect(parsed.length).toEqual(navLinks.length);
  });
});
