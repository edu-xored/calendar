import * as React from 'react';
import { User } from '../lib/model';
import { fetchJSON } from './api';

// styles must be explicitly imported to be extracted into /dist/styles.css bundle
import './pages/style.scss';

interface PageState {
  user?: User;
}

export default class Header extends React.Component<{}, PageState> {
  state: PageState = {
    user: {
      id: '',
      name: 'man',
      login: '',
    },
  };

  componentDidMount() {
    fetchJSON<User>('/api/user/1').then(user => {
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="ui top fixed inverted large menu">
        <div className="blue header active item sidebar-toggle">
          <i className="icon sidebar"></i> AppName
        </div>
        <a className="item" href="/"><i className="home icon"></i> Home</a>
        <div className="ui dropdown item">dropdown <i className="dropdown icon"></i>
          <div className="stackable menu">
            <a className="item">item</a>
            <a className="item">item</a>
            <a className="item">item</a>
          </div>
        </div>
      </div>
    );
  }
}
