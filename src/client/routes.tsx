import * as React from 'react';
import { Router, Route, IndexRoute, RouterState, RedirectFunction } from 'react-router';
import history from './history';
import Home from './pages/home';
import Blank from './pages/blank';
import CalendarList from './pages/calendar_list';
import Calendar from './pages/calendar';
import AdminTeams from './pages/admin/teams';
import AdminUsers from './pages/admin/users';
import Login from './pages/login';
import ProfilePage from './pages/profile';
import PageHeader from './pageheader';
import API from './api';

function requireUser(nextState: RouterState, replace: RedirectFunction, callback?: Function) {
  API.me().then(() => {
    callback();
  }, () => {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
    callback();
  });
}

class BasicLayout extends React.Component<any, {}> {
  render() {
    return (
      <div>
        <div id='header'>
          <PageHeader/>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const Routes = (
  <Router history={history}>
    <Route path="/" component={BasicLayout} onEnter={requireUser}>
      <IndexRoute component={Home} onEnter={requireUser} />
      <Route path="admin/teams" component={AdminTeams} onEnter={requireUser} />
      <Route path="admin/users" component={AdminUsers} onEnter={requireUser} />
      <Route path="admin/calendars" component={CalendarList} onEnter={requireUser} />
      <Route path="calendar/:id" component={Calendar} onEnter={requireUser}/>
      <Route path="profile" component={ProfilePage} onEnter={requireUser} />
    </Route>
    <Route path="/login" component={Login}/>
    <Route path="*" component={Blank}/>
  </Router>
);

export default Routes;
