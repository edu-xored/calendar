import * as _ from 'lodash';
import * as React from 'react';
import * as Modal from 'react-modal';

import { Team } from '../../../../lib/model';
import api from '../../../api';
import AddPanel from './AddPanel';
import Grid from "./Grid";

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

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default class CalendarView extends React.Component<any, ITeamsViewState> {

    state: ITeamsViewState = defaultState;

    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.addTeam = this.addTeam.bind(this);
        this.deleteTeam = this.deleteTeam.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);

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

    handleOnChange(e: any) {
        let state = this.state;
        let input: HTMLInputElement = e.target;
        state.team[input.placeholder] = input.value; // TODO: No! Do it another way
        this.setState(state);
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
                <div>
                    <button onClick={this.openModal}>Open Modal</button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        >

                        <button onClick={this.closeModal}>Cancel</button>
                        <div>I am a modal</div>
                        <input key="name" placeholder="name" value={this.state.team.name} onChange={this.handleOnChange} />
                        <input key="avatar" placeholder="avatar" value={this.state.team.avatar} onChange={this.handleOnChange} />
                        <input key="placeholder" placeholder="description" value={this.state.team.description} onChange={this.handleOnChange} />
                        <button onClick={this.addTeam}>Save</button>
                    </Modal>
                </div>
                <section className='calendar-grid'>
                    <Grid data={this.state.data} deleteTeam={this.deleteTeam} />
                </section>
            </div>
        );
    }
}
