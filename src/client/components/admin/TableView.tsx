import * as _ from 'lodash';
import * as React from 'react';

import Modal from './Modal';

interface ITableViewState {
    data: any[];
    modalIsOpen: boolean;
    modalData: any;
    modalAction: (d: any) => void;
};

interface ITableViewProps {
    defaultModalData: any;
    headers: string[];
    modalFields: string[];
    api: any;
}

export default class TableView extends React.Component<ITableViewProps, ITableViewState> {
    defaultState = {
        data: [],
        modalIsOpen: false,
        modalData: this.props.defaultModalData,
        modalAction: null
    };

    constructor(props) {
        super(props);
        this.state = this.defaultState;
        this.init();
    }

    init = () => {
        this.props.api.getList().then((entities: any[]) => {
            this.setState(Object.assign({}, this.state, { data: entities }));
        });
    }

    handlePromise = (p: Promise<any>) => {
        p.then(() => {
            this.init();
        }, err => {
            alert(err);
        });
    }

    add = (entity: any) => {
        this.handlePromise(this.props.api.create(entity));
    }

    edit = (entity: any) => {
        this.handlePromise(this.props.api.update(entity.id, entity));
    }

    delete = (id: string) => {
        this.handlePromise(this.props.api.remove(id));
    }

    openModal = (id?: string) => {
        let state = this.state;
        this.state.modalAction = this.add;
        this.state.modalData = Object.assign({}, this.props.defaultModalData);
        state.modalIsOpen = true;
        if (id) {
            state.modalData = this.state.data.find(t => t.id === id);
            state.modalAction = this.edit;
        }
        this.setState(state);
    }

    closeModal = () => {
        this.setState(Object.assign({}, this.state, { modalIsOpen: false }));
    }

    render() {
        return (
            <div className='table-view'>
                <button onClick={() => this.openModal}>
                    Create
                </button>
                <Modal entity={this.state.modalData} fields={this.props.modalFields} action={this.state.modalAction} closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen} />
                <div className='grid'>
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
                            _.map(this.state.data, (entity) => {
                                const fieldsValues = _.map(this.props.headers, (propertyName) => entity[propertyName]);
                                const onEdit = () => this.openModal(entity.id);
                                const onDelete = () => this.delete(entity.id);
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
            </div >
        );
    }
}
