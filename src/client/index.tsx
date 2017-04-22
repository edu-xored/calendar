import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers/index';
import Routes from './routes';

import {loginFlow} from './sagas/login';

const sagaMiddleware = createSagaMiddleware();

export let store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  );

sagaMiddleware.run(loginFlow);

const Root = () => (
      <Provider store={store}>
        { Routes }
      </Provider>
    );

render(
  <Root />,
  document.getElementById('root')
);
