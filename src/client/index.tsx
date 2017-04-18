import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducers/index';
import Routes from './routes';

let store = createStore(reducer);

const Root = () => (
      <Provider store={store}>
        { Routes }
      </Provider>
    );

render(
  <Root />,
  document.getElementById('root')
);
