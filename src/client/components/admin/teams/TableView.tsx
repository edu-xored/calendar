import * as _ from 'lodash';
import * as React from 'react';

import { Team } from '../../../../lib/model';
import api from '../../../api';
import Grid from "./Grid";
import Modal from '../common//Modal';

interface ITeamsViewState {
    data: Team[];
    modalIsOpen: boolean;
    modalData: Team;
    modalAction: (d: any) => void;
};

const defaultModalData: Team = {
    id: '',
    name: '',
    avatar: '',
    description: ''
}

const defaultState = {
    data: [],
    modalIsOpen: false,
    modalData: defaultModalData,
    modalAction: null
};

const modalFields = ['name', 'avatar', 'description']

export default class CalendarView extends React.Component<any, ITeamsViewState> {

    state: ITeamsViewState = defaultState;

    constructor(props) {
        super(props);
        this.init();
    }

    init = () => {
        api.teams.getList().then((teams: Team[]) => {
            this.setState(Object.assign({}, this.state, { data: teams }));
        });
    }

    handlePromise = (p: Promise<any>) => {
        p.then(() => {
            this.init();
        }, err => {
            alert(err);
        });
    }

    addTeam = (team: Team) => {
        this.handlePromise(api.teams.create(team));
    }

    editTeam = (team: Team) => {
        this.handlePromise(api.teams.update(team.id, team));
    }

    deleteTeam = (id: string) => {
        api.teams.remove(id).then(() => {
            this.init();
        }, err => {
            alert(err);
        });
    }

    handleOnCreateTeam = () => {
        this.openModal();
    }

    openModal = (id?: string) => {
        let state = this.state;
        this.state.modalAction = this.addTeam;
        this.state.modalData = defaultModalData;
        state.modalIsOpen = true;
        if (id) {
            state.modalData = this.state.data.find(t => t.id == id);
            state.modalAction = this.editTeam;
        }
        this.setState(state);
    }

    closeModal = () => {
        this.setState(Object.assign({}, this.state, { modalIsOpen: false }));
    }

    render() {
        return (
            <div className='teams-view'>
                <button onClick={this.handleOnCreateTeam}>
                    Create
                </button>
                <section className='teams-grid'>
                    <Grid data={this.state.data} deleteTeam={this.deleteTeam} openEditModal={this.openModal} />
                </section>

                <Modal entity={this.state.modalData} fields={modalFields} action={this.state.modalAction} closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen} />
            </div >
        );
    }
}
