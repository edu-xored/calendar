import * as _ from 'lodash';
import * as React from 'react';

import { User } from '../../../../lib/model';
import api from '../../../api';
import AddPanel from './AddPanel';
import Grid from "./Grid";

interface IUsersViewState {
    data: User[];
};

const defaultState = {
    data: [],
};

export default class CalendarView extends React.Component<any, IUsersViewState> {

    state: IUsersViewState = defaultState;

    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.addUser = this.addUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.init();
    }

    init() {
        api.users.getList().then((users: User[]) => {
            this.setState({
                data: users
            })
        });
    }

    addUser(user: User) {
        api.users.create(user);
        this.init();
    }

    deleteUser(id: string) {
        api.users.remove(id).then(() => {
          this.init();
        }, err => {
          alert(err);
        });
    }

    render() {
        return (
            <div className='users-view'>
                <section className='add-panel'>
                    <AddPanel add={this.addUser} />
                </section>
                <section className='calendar-grid'>
                    <Grid data={this.state.data} delete={this.deleteUser}/>
                </section>
            </div>
        );
    }
}
