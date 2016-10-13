import * as React from 'react';
import { Router, Route, IndexRoute, RouterState } from 'react-router';
import Home from './pages/home';
import Blank from './pages/blank';

const Routes = (
  <Router>
    <Route path="/" component={Home}/>
    <Route path="*" component={Blank}/>
  </Router>
);

export default Routes;
