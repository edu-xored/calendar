import * as _ from 'lodash';
import * as React from 'react';

import Row from '../common/Row';
import Cell from '../common/Cell';
import { User } from '../../../../lib/model';

interface IGridProps {
    delete: (id: string) => void;
    data: any[];
}

interface IGridState {
    users: User[];
    headers: string[];
}

const headers = ['id', 'createAt', 'createBy', 'updateAt', 'updateBy', 'name', 'email', 'login', 'pwdhash', 'avatar', 'role', 'position', 'place'];

export default class Grid extends React.Component<IGridProps, IGridState> {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e: MouseEvent) {
        let target: HTMLButtonElement = e.target as HTMLButtonElement;
        let entityId = target.parentElement.id;
        this.props.delete(entityId);
    }

    render() {
        const usersRows = _.map(this.props.data, user => {
            const data = _.map(headers, propertyName => user[propertyName]);
            return (
                <Row key={user.id} id={user.id} rowData={data} onDelete={this.handleDelete} />
            );
        });
        return (
            <div id='users-grid'>
                <section className='top-row'>
                    {headers.map((cellData, i) => <Cell key={i} data={cellData} />)}
                </section>
                <section className='users-rows'>
                    {usersRows}
                </section>
            </div>
        );
    }
}