import * as React from 'react';

import TeamsView from '../../components/admin/TableView';
import api from '../../api';

const headers = ['id', 'createAt', 'createBy', 'updateAt', 'updateBy', 'name', 'avatar', 'description'];
const modalFields = ['name', 'avatar', 'description'];

const defaultModalData: any = {
  id: '',
  name: '',
  avatar: '',
  description: ''
};

export default class TeamsPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <TeamsView headers={headers} modalFields={modalFields} api={api.teams} defaultModalData={defaultModalData} />
      </div>
    );
  }
}