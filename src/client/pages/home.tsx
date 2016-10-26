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
    (async () => {
      try {
        const user = await fetchJSON<User>('/api/user/1');
        this.setState({ user });
      } catch (err) {
        alert(err);
      }
    })();
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <a href="/sui">Semantic UI example</a>
        <div className="flex">
          <div>Hey,</div>
          <div>{user.name}!</div>
        </div>
      </div>
    );
  }
}
