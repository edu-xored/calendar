import * as React from 'react';

import { Team } from '../../../../lib/model';

interface IAddPanelProps {
    add: (team: Team) => void;
}

interface IAddPanelState {
    team: Team;
}

export default class AddPanel extends React.Component<IAddPanelProps, IAddPanelState> {
    constructor(props) {
        super(props);
        this.state = {
            team: {
                id: 'rtggrt',
                name: 'rtggrt',
                avatar: 'rtggrt',
                description: 'rtggrt'
            }
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.add = this.add.bind(this);
    }

    onChangeName(e: any) {
        this.state.team.name = e.target.value;
        this.setState(this.state);
    }

    onChangeAvatar(e: any) {
        this.state.team.avatar = e.target.value;
        this.setState(this.state);
    }

    onChangeDescription(e: any) {
        this.state.team.description = e.target.value;
        this.setState(this.state);
    }

    add() {
        this.props.add(this.state.team);
    }

    render() {
        return (
            <div>
                <input placeholder="name" value={this.state.team.name} onChange={this.onChangeName} />
                <input placeholder="avatar" value={this.state.team.avatar} onChange={this.onChangeAvatar} />
                <input placeholder="description" value={this.state.team.description} onChange={this.onChangeDescription} />
                <button onClick={this.add}> Add </button>
            </div>
        )
    }
}