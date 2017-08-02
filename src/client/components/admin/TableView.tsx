import * as _ from 'lodash';
import * as React from 'react';
import { Table, Container, Icon } from 'semantic-ui-react';
import Modal from './Modal';


interface ITableViewState {
    data: any[];
    modalIsOpen: boolean;
    modalData: any;
    modalAction: (d: any) => void;
}

interface ITableViewProps {
    defaultModalData: any;
    headers: string[];
    modalFields: string[];
    api: any;
}

interface ITableViewDispatch {
    changeData(data: any[]);
    changeModalData(data: any);
    changeModalVisible(modalIsOpen: boolean);
    changeModalAction(modalAction: (d: any) => void);
}

type TableViewProps = ITableViewProps & ITableViewState & ITableViewDispatch;

export default class TableView extends React.Component<TableViewProps, {}> {
    defaultProps = {
        data: [],
        modalIsOpen: false,
        modalData: this.props.defaultModalData,
        modalAction: null
    };

    constructor(props) {
        super(props);
        console.log("Constructor Table View: ",this.props.data, this.props.modalData, this.props.modalIsOpen);
        this.init();
    }

    init = () => {
        this.props.api.getList().then((entities: any[]) => {
            //this.setState(Object.assign({}, this.state, { data: entities }));
            let state = {
                data: this.props.data,
                modalData: this.props.modalData,
                modalIsOpen: this.props.modalIsOpen,
                modalAction: this.props.modalAction
            }
            state = Object.assign({}, state, { data: entities });
            this.props.changeData(state.data);
            this.props.changeModalData(state.modalData);
            this.props.changeModalVisible(state.modalIsOpen);
            this.props.changeModalAction(state.modalAction);
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
        let state = {
          modalAction: this.add,
          modalData: Object.assign({}, this.props.defaultModalData),
          modalIsOpen: true,
        };
        if (id) {
            state.modalData = this.props.data.find(t => t.id === id);
            state.modalAction = this.edit;
        }
        //this.setState(state);
        this.props.changeModalData(state.modalData);
        this.props.changeModalVisible(state.modalIsOpen);
        this.props.changeModalAction(state.modalAction);
    }

    closeModal = () => {
        let state = {
                data: this.props.data,
                modalData: this.props.modalData,
                modalIsOpen: this.props.modalIsOpen,
                modalAction: this.props.modalAction
        }
        state = Object.assign({}, state, { modalIsOpen: false });
        this.props.changeData(state.data);
        this.props.changeModalData(state.modalData);
        this.props.changeModalVisible(state.modalIsOpen);
        this.props.changeModalAction(state.modalAction);
    }

    render() {
        return (
            <div>
                <Modal 
                    entity={this.props.modalData} 
                    fields={this.props.modalFields} 
                    action={this.props.modalAction} 
                    closeModal={this.closeModal} 
                    modalIsOpen={this.props.modalIsOpen} 
                    changeEntity={this.props.changeModalData} 
                />
                <Container>
                    <Table>
                        <Table.Header fullWidth={false}>
                            {
                                _.map(this.props.headers, header => (
                                    <Table.HeaderCell key={header}>
                                        {header}
                                    </Table.HeaderCell>
                                ))
                            }
                            <Table.HeaderCell key={'add'}>
                                <button onClick={() => this.openModal()}>
                                    <Icon name='add' />
                                </button>
                            </Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            { _.map(this.props.data, (entity) => this.renderRow(entity)) }
                        </Table.Body>
                    </Table>
                </Container >
            </div>
        );
    }

    renderRow(entity: any) {
        const onEdit = () => this.openModal(entity.id);
        const onDelete = () => this.delete(entity.id);
        return (
            <Table.Row key={entity.id}>
                { _.map(this.props.headers, prop => this.renderField(entity, prop)) }
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
    }

    renderField(entity: any, propertyName: string) {
      const value = entity[propertyName];
      let content = value;

      if (propertyName === "avatar") {
        content = <img src={value} />;
      }

      return (
        <Table.Cell key={propertyName}>
          {content}
        </Table.Cell>
      );
    }
}
