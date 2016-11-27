import * as React from 'react';
import * as ReactModal from 'react-modal';

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
    entity: any
};

interface IModalProps {
    entity: any,
    closeModal: any,
    fields: string[],
    modalIsOpen: boolean,
    action: (entity) => void
}

export default class Modal extends React.Component<IModalProps, IModalState> {
    constructor(props) {
        super(props);

        this.state = { entity: this.props.entity };

        this.apply = this.apply.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    apply() {
        this.props.action(this.state.entity);
    }

    handleOnChange(e: any) {
        let state = this.state;
        let input: HTMLInputElement = e.target;
        this.state.entity[input.placeholder] = input.value; // TODO: No! Do it another way
        this.setState(state);
    }

    render() {
        return (
            <ReactModal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                >
                {this.props.fields.map((fieldName) => <input placeholder={fieldName} value={this.state.entity[fieldName]} onChange={this.handleOnChange} />)}
                <button onClick={this.props.closeModal}>Cancel</button>
                <button onClick={this.apply}>Save</button>
            </ReactModal>
        );
    }
}