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
      <div>
        <a className="item"><i className="home icon"></i> Home </a>
        <a className="item"><i className="block layout icon"></i> Topics </a>
        <a className="item"><i className="smile icon"></i> Friends </a>
        <a className="item"><i className="calendar icon"></i> History </a>
      </div>
    );
  }
}
