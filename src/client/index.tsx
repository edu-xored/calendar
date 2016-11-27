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

// TODO remove when login page is completed!
API.login('admin', 'admin').then(() => {
  console.log('logged in as admin');
}, err => {
  console.log('error:', err);
});

render(<Root/>, document.getElementById('root'));
