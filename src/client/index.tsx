import * as React from 'react';
import { render } from 'react-dom';
import Routes from './routes';
import PageHeader from './pageheader';

class Root extends React.Component<{}, {}> {
  render() {
    return Routes;
  }
}

render(<PageHeader/>, document.getElementById('header'));
render(<Root/>, document.getElementById('root'));
