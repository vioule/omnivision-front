import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

import reducers from './reducers';
import projectSaga from '../project/sagas';

const composeEnhancers = (process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // eslint-disable-line

const reduxRouterMiddleware = routerMiddleware();
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunk,
      reduxRouterMiddleware,
      apiMiddleware,
      sagaMiddleware
    )
  )
);

sagaMiddleware.run(projectSaga);

export const persistor = null;
