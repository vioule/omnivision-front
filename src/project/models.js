// @flow
import moment from 'moment';

export type Resource = {
  name: string,
  description: string,
  days: number,
};

export type Project = {
  id: number,
  name: string,
  description: string,
  startDate: moment,
  endDate: moment,
  days: number,
  resources: Array<Resource>,
};

export type State = {
  projects: {
    isLoading: boolean,
    collection: Array<Project>,
    error: ?string,
  },
};
