import * as _ from 'lodash';
import * as React from 'react';
import { Table, Container, Icon } from 'semantic-ui-react';

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
            <div>
                <Modal entity={this.state.modalData} fields={this.props.modalFields} action={this.state.modalAction} closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen} />
                <Container>
                    <Table>
                        <Table.Header fullWidth={false}>
                            {
                                this.props.headers.map((header) =>
                                    <Table.HeaderCell key={header}>
                                        {header}
                                    </Table.HeaderCell>)

                            }
                            <Table.HeaderCell>
                                <button onClick={() => this.openModal()}>
                                    <Icon name='add' />
                                </button>
                            </Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            {
                                _.map(this.state.data, (entity) => {
                                    const fieldsValues = _.map(this.props.headers, (propertyName) => entity[propertyName]);
                                    const onEdit = () => this.openModal(entity.id);
                                    const onDelete = () => this.delete(entity.id);
                                    return (
                                        <Table.Row key={entity.id}>
                                            {fieldsValues.map((fieldValue, i) =>
                                                <Table.Cell key={i}>
                                                    {fieldValue}
                                                </Table.Cell>)}
                                            <Table.Cell key='buttons'>
                                                <button onClick={onEdit}>
                                                    <Icon name='edit' />
                                                </button>
                                                <button onClick={onDelete}>
                                                    <Icon name='delete' />
                                                </button>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })
                            }
                        </Table.Body>
                    </Table>
                </Container >
            </div>
        );
    }
}