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
    entity: any;
    closeModal: any,
    fields: string[],
    modalIsOpen: boolean,
    action: (entity: any) => void
}

export default class Modal extends React.Component<IModalProps, IModalState> {
    constructor(props) {
        super(props);
        this.state = { entity: this.props.entity };
    }

    componentWillReceiveProps(nextProps: IModalProps) {
        this.setState({ entity: nextProps.entity });
    }

    apply = () => {
        this.props.action(this.state.entity);
        this.props.closeModal();
    };

    renderEditField(fieldName: string) {
        const handleOnChange = (e: any) => {
            let state = this.state;
            this.state.entity[fieldName] = e.target.value;
            this.setState(state);
        };
        return (
            <div id={`edit-field-${fieldName}`} key={fieldName} >
                <label>{fieldName}:</label>
                <input placeholder={fieldName} value={this.state.entity[fieldName]} onChange={handleOnChange} />
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
                <button onClick={this.props.closeModal}>Cancel</button>
                <button onClick={this.apply}>Save</button>
            </ReactModal>
        );
    }
}
