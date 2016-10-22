import * as React from 'react';
import { render } from 'react-dom';
import Routes from './routes';

class Root extends React.Component<{}, {}> {
  render() {
    return Routes;
  }
}

render(<Root/>, document.getElementById('root'));
