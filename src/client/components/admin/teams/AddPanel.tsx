import * as React from 'react';

import { Team } from '../../../../lib/model';

interface IAddPanelState {
    team: Team;
}

export default class AddPanel extends React.Component<any, IAddPanelState> {
    constructor(props) {
        super(props);
        this.state.team = {
            id: '',
            name: '',
            avatar: '',
            description: ''
        }

        this.onChangeName.bind(this);
    }

    onChangeName(e: any) {
        this.state.team.name = e.target.value;
        this.setState(this.state);
    }

    render() {
        return (
            <div>
                <input placeholder="name" value={this.state.team.name} onChange={this.onChangeName} /> 
            </div>
        )
    }
}