import * as React from 'react';

import { Header, Container } from 'semantic-ui-react';
import TeamsView from '../../components/admin/TableView';
import api from '../../api';

const headers = ['id', 'avatar', 'name', 'description'];
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
            <Container>
                <Header content='Teams' />
                <TeamsView headers={headers} modalFields={modalFields} api={api.teams} defaultModalData={defaultModalData} />
            </Container>
        );
    }
}
