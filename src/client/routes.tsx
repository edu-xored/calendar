import * as React from 'react';
import { Router, Route, IndexRoute, RouterState } from 'react-router';
import history from './history';
import Home from './pages/home';
import Blank from './pages/blank';
import CalendarList from './pages/calendar_list';
import Calendar from './pages/calendar';
import Login from './pages/login';
import PageHeader from './pageheader';

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
    <Route path="/" component={BasicLayout}>
      <IndexRoute component={Home}/>
      <Route path="admin/calendars" component={CalendarList}/>
      <Route path="calendar/*" component={Calendar}/>
    </Route>
    <Route path="/login" component={Login}/>
    <Route path="*" component={Blank}/>
  </Router>
);

export default Routes;
