import * as React from 'react';
import { User } from '../../lib/model';
import { fetchJSON } from '../api';

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
    })
  }

  render() {
    const { user } = this.state;
    if (user) {
      return <div>Hey, {user.name}</div>
    }
    return <div>User is not fetched yet!</div>;
  }
}
