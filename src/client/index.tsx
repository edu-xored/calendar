import * as React from 'react';
import { render } from 'react-dom';
import Routes from './routes';
import TopMenu from './menu-head';
import SideMenu from './menu-side';

class Root extends React.Component<{}, {}> {
  render() {
    return Routes;
  }
}

render(<Root/>, document.getElementById('root'));
render(<TopMenu/>, document.getElementById('menubar'));
render(<SideMenu/>, document.getElementById('sidebar'));
