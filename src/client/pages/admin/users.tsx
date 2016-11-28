import * as React from 'react';

import { Header, Container } from 'semantic-ui-react';
import TeamsView from '../../components/admin/TableView';
import api from '../../api';

const headers = ['id', 'avatar', 'name', 'email', 'login', 'role', 'position', 'place'];
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
            <Container>
                <Header content='Users' />
                <TeamsView headers={headers} modalFields={modalFields} api={api.users} defaultModalData={defaultModalData} />
            </Container>
        );
    }
}
