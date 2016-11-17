import * as React from "react";
import Row from "./Row";
import { Team } from "../../../../lib/model";

interface IGridState {
    teams: Team[];
    headers: string[];
}

const teams: Team[] = [];

const headers = ["id", "createAt", "createBy", "updateAt", "updateBy", "name", "avatar", "description"];

export default class Grid extends React.Component<any, IGridState> {
    init() {
        for (let i=0; i < 10; i++) {
            teams.push({
                id: `${i}`,
                name: 'name',
                avatar: 'yes',
                description: 'very good'
            });
        }
    }
    render() {
        this.init();
        let teamsRows = [];
        teams.forEach(team => {
            let data = [];
            headers.forEach((propertyName) => {
                data.push(team[propertyName]);
            })
            teamsRows.push(
                <div>
                    <Row id={team.id} rowData={data} />
                </div>
            );
        });
        return (
            <div id='teams-grid'>
                <section className='top-row'>
                    <Row id="headers" rowData={headers} />
                </section>
                <section className='teams-rows'>
                    { teamsRows }
                </section>
            </div>
        );
    }
}