import * as _ from 'lodash';
import * as React from 'react';

import Row from './Row';

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
                <div className='grid-headers'>
                    {
                        this.props.headers.map((header, i) =>
                            <div className="grid-header">
                                {header}
                            </div>)
                    }
                </div>
                <div className='grid-data'>
                    {dataRows}
                </div>
            </div>
        );
    }
}