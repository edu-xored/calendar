import * as _ from 'lodash';
import * as React from 'react';

import { Team } from '../../../../lib/model';
import api from '../../../api';
import Grid from "./Grid";
import Modal from './Modal';

interface ITeamsViewState {
    data: Team[];
    modalIsOpen: boolean;
    team: Team
};

const defaultState = {
    data: [],
    modalIsOpen: false,
    team: {
        id: 'rtggrt',
        name: 'rtggrt',
        avatar: 'rtggrt',
        description: 'rtggrt'
    }
};

const modalFields = ['name', 'avatar', 'description']

export default class CalendarView extends React.Component<any, ITeamsViewState> {

    state: ITeamsViewState = defaultState;

    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.addTeam = this.addTeam.bind(this);
        this.deleteTeam = this.deleteTeam.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.init();
    }

    init() {
        api.teams.getList().then((teams: Team[]) => {
            this.setState(defaultState);
        });
    }

    addTeam() {
        api.teams.create(this.state.team);
        this.init();
    }

    deleteTeam(id: string) {
        api.teams.remove(id).then(() => {
            this.init();
        }, err => {
            alert(err);
        });
    }

    openModal() {
        this.setState(Object.assign({}, this.state, { modalIsOpen: true }));
    }

    closeModal() {
        this.setState(Object.assign({}, this.state, { modalIsOpen: false }));
    }

    render() {
        return (
            <div className='teams-view'>
                <button onClick={this.openModal}>
                    Create
                </button>
                <section className='teams-grid'>
                    <Grid data={this.state.data} deleteTeam={this.deleteTeam} />
                </section>
                <Modal entity={this.state.team} fields={modalFields} action={this.addTeam} closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen} />
            </div >
        );
    }
}
