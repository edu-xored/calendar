import * as _ from 'lodash';
import * as React from 'react';

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

    render() {
        return (
            <div id='grid'>
                <div className='grid-headers'>
                    {
                        this.props.headers.map((header) =>
                            <div className="grid-header" key={header}>
                                {header}
                            </div>)
                    }
                </div>
                <div className='grid-data'>
                    {
                        _.map(this.props.data, (entity) => {
                            const fieldsValues = _.map(this.props.headers, (propertyName) => entity[propertyName]);
                            const onEdit = () => this.props.openEditModal(entity.id);
                            const onDelete = () => this.props.onDelete(entity.id);
                            return (
                                <div className='grid-row' id={entity.id} key={entity.id}>
                                    {fieldsValues.map((fieldValue, i) =>
                                        <div className='grid-cell' key={i}>
                                            {fieldValue}
                                        </div>)}
                                    <button onClick={onEdit}> Edit </button>
                                    <button onClick={onDelete}> Delete </button>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}