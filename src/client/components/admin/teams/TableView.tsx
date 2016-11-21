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

        this.init = this.init.bind(this);
        this.addTeam = this.addTeam.bind(this);
        this.deleteTeam = this.deleteTeam.bind(this);

        this.init();        
    }

    init() {
        api.teams.getList().then((teams: Team[]) => {
            this.setState({
                data: teams
            })
        });
    }

    addTeam(team: Team) {
        api.teams.create(team);
        this.init();
    }
    
    deleteTeam(id: string) {
        api.teams.remove(id);
        this.init();
    }

    render() {
        return (
            <div className='teams-view'>
                <section className='add-panel'>
                    <AddPanel add={this.addTeam} />
                </section>
                <section className='calendar-grid'>
                    <Grid data={this.state.data} deleteTeam={this.deleteTeam}/>
                </section>
            </div>
        );
    }
}
