import * as React from 'react';

import TeamsView from '../../components/admin/TableView';
import api from '../../api';

const headers = ['id', 'createAt', 'createBy', 'updateAt', 'updateBy', 'name', 'email', 'login', 'pwdhash', 'avatar', 'role', 'position', 'place'];
const modalFields = ['name', 'avatar', 'email'];

const defaultModalData: any = {
  id: '',
  name: '',
  avatar: '',
  email: ''
};

export default class TeamsPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <TeamsView headers={headers} modalFields={modalFields} api={api.users} defaultModalData={defaultModalData} />
      </div>
    );
  }
}