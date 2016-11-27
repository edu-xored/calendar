import * as _ from 'lodash';
import * as React from 'react';

import Row from './Row';
import Cell from './Cell';

interface IGridProps {
    onDelete: (id: string) => void;
    openEditModal: (id: string) => void;
    data: any[];
    headers: string[];
}

export default class Grid extends React.Component<IGridProps, any> {
    constructor(props) {
        super(props);
    }

    handleDelete = (e: MouseEvent) => {
        let target: HTMLButtonElement = e.target as HTMLButtonElement;
        let entityId = target.parentElement.id;
        this.props.onDelete(entityId);
    }

    handleEdit = (e: MouseEvent) => {
        let target: HTMLButtonElement = e.target as HTMLButtonElement;
        let entityId = target.parentElement.id;
        this.props.openEditModal(entityId);
    }

    render() {
        const dataRows = _.map(this.props.data, entity => {
            const data = _.map(this.props.headers, propertyName => entity[propertyName]);
            return (
                <Row key={entity.id} id={entity.id} rowData={data} onDelete={this.handleDelete} onEdit={this.handleEdit} />
            );
        });
        return (
            <div id='grid'>
                <section className='top-row'>
                    {this.props.headers.map((cellData, i) => <Cell key={i} data={cellData} />)}
                </section>
                <section className='data-rows'>
                    {dataRows}
                </section>
            </div>
        );
    }
}