import * as React from 'react';
import { User } from '../../lib/model';
import { fetchJSON } from '../api';

// styles must be explicitly imported to be extracted into /dist/styles.css bundle
import './style.scss';

interface PageState {
  user?: User;
}

export default class HomePage extends React.Component<{}, PageState> {
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
      <div className="flex">
        <div>Hey,</div>
        <div>{user.name}!</div>
      </div>
    );
  }
}
