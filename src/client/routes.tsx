import * as React from 'react';
import { Router, Route, IndexRoute, RouterState } from 'react-router';
import history from './history';
import Home from './pages/home';
import Blank from './pages/blank';
import Calendar from './pages/calendar';
import AdminTeams from './pages/admin/teams';
import AdminUsers from './pages/admin/users';

const Routes = (
  <Router history={history}>
    <Route path="/" component={Home}/>
    <Route path="/calendar/*" component={Calendar}/>
    <Route path="/admin/teams" component={AdminTeams}/>
    <Route path="/admin/users" component={AdminUsers}/>    
    <Route path="*" component={Blank}/>
  </Router>
);

export default Routes;
