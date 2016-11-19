import * as _ from 'lodash';
import * as React from 'react';

import { Team } from '../../../../lib/model';
import api from '../../../api';
import AddPanel from './AddPanel';
import Grid from "./Grid";

interface ITeamsViewState {
    data: Team[];
};

const defaultState = {
    data: [],
};

export default class CalendarView extends React.Component<any, ITeamsViewState> {

    state: ITeamsViewState = defaultState;

    constructor(props) {
        super(props);
        api.teams.getList().then((teams: Team[]) => {
            this.state.data = teams;
            this.render();
        });
        this.addTeam = this.addTeam.bind(this);
    }

    addTeam(team: Team) {
        let teams = this.state.data;
        teams.push(team);
        this.setState({
            data: teams
        });
        api.teams.create(team);
    }

    render() {
        return (
            <div className='calendar-view'>
                <section className='add-panel'>
                    <AddPanel add={this.addTeam} />
                </section>
                <section className='calendar-grid'>
                    <Grid data={this.state.data} />
                </section>
            </div>
        );
    }
}
