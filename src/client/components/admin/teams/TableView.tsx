import * as _ from 'lodash';
import * as React from 'react';

import { Calendar, Event, Team, User } from '../../../../lib/model';
import Grid from "./Grid";
import Row from "./Row";

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
    }

    render() {
        return (
            <div className='calendar-view'>
                <section className='calendar-grid'>
                    <Grid data={this.state.data}/>
                </section>
            </div>
        );
    }
}
