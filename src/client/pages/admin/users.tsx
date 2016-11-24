import * as React from 'react';

import UsersView from '../../components/admin/users/TableView';

export default class UsersPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <UsersView />
      </div>
    );
  }
}