import { push, replace } from 'react-router-redux';
import * as coreConstants from '../constants';
import * as coreActions from '../actions';

describe('Core actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('defines actions', () => {
    expect(coreActions.changeLocation).toBeDefined();
    expect(coreActions.replaceLocation).toBeDefined();
  });

  it('changeLocation', () => {
    const path = coreConstants.PATHS.PROJECT;
    const expectedAction = push(path);
    const action = coreActions.changeLocation(path);
    expect(action).toEqual(expectedAction);
  });

  it('replaceLocation', () => {
    const path = coreConstants.PATHS.PROJECT;
    const expectedAction = replace(path);
    const action = coreActions.replaceLocation(path);
    expect(action).toEqual(expectedAction);
  });
});
