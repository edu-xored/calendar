import * as React from 'react';
import { render } from 'react-dom';
import Routes from './routes';
import PageHeader from './pageheader';
import API from './api';

class Root extends React.Component<{}, {}> {
  render() {
    return Routes;
  }
}

render(<Root/>, document.getElementById('root'));
