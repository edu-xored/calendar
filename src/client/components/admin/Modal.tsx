import * as React from 'react';
import * as ReactModal from 'react-modal';

import { Icon } from 'semantic-ui-react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

interface IModalState {
    entity: any;
}

interface IModalProps {
    entity: any;
    closeModal: any;
    fields: string[];
    modalIsOpen: boolean;
    action: (entity: any) => void;
}

interface IDispatchProps {
    changeEntity(e: any);
}

type ModalProps = IModalProps & IDispatchProps;

export default class Modal extends React.Component<ModalProps, {}> {
    constructor(props) {
        super(props);
        //this.state = { entity: this.props.entity };
    }

    componentWillReceiveProps(nextProps: IModalProps) {
        //this.setState({ entity: nextProps.entity });
        this.props.changeEntity(nextProps);
    }

    apply = () => {
        this.props.action(this.props.entity);
        this.props.closeModal();
    }

    renderEditField(fieldName: string) {

        const handleOnChange = (e: any) => {
            const entity = Object.assign({}, this.props.entity, {fieldName: e.target.value});
            this.props.changeEntity(entity);
            return entity;
        };

        return (     
            <div id={`edit-field-${fieldName}`} key={fieldName} >
                <label>{fieldName}:</label>
                <input placeholder={fieldName} value={this.props.entity[fieldName]} onChange={handleOnChange} />
            </div>
        );
    }

    render() {
        return (
            <ReactModal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                >
                {this.props.fields.map((fieldName) => this.renderEditField(fieldName))}
                <button onClick={this.props.closeModal}>
                    <Icon name='cancel' />
                </button>
                <button onClick={this.apply}>
                    <Icon name='save' />
                </button>
            </ReactModal>
        );
    }
}
