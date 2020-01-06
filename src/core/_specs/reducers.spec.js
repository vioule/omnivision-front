import { createStore } from 'redux';

import rootReducer from '../reducers';
import { NAME as CALENDAR_NAME } from '../../calendar/constants';
import { NAME as PROJECT_NAME } from '../../project/constants';

describe('Root reducer', () => {
  let store = null;

  beforeEach(() => {
    store = createStore(rootReducer);
  });

  it('allows to create a store', () => {
    expect(store).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(typeof store.getState).toEqual('function');
    expect(store.dispatch).toBeDefined();
    expect(typeof store.dispatch).toEqual('function');
    expect(store.subscribe).toBeDefined();
    expect(typeof store.subscribe).toEqual('function');
  });

  it('is defined as expected', () => {
    const state = store.getState();
    expect(state[CALENDAR_NAME]).toBeDefined();
    expect(state[PROJECT_NAME]).toBeDefined();
    expect(state.routing).toBeDefined();
  });
});
