import * as React from 'react';

import { Header, Container } from 'semantic-ui-react';
import TeamsView from '../../components/admin/TableView';
import api from '../../api';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TableViewActions from '../../actions/tableView';

const headers = ['id', 'avatar', 'name', 'description'];
const modalFields = ['name', 'avatar', 'description'];

const defaultModalData: any = {
    id: '',
    name: '',
    avatar: '',
    description: ''
};

function mapStateToProps(state) {
    return {
        data: state.teamsPage.data,
        modalIsOpen: state.teamsPage.modalIsOpen,
        modalData: state.teamsPage.modalData,
        modalAction: state.teamsPage.modalAction
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeModalData: bindActionCreators(TableViewActions.changeModalData, dispatch),
        changeData: bindActionCreators(TableViewActions.changeData, dispatch),
        changeModalVisible: bindActionCreators(TableViewActions.changeModalVisible, dispatch),
        changeModalAction: bindActionCreators(TableViewActions.changeModalAction, dispatch)
    }
}

interface ITeamsPageState {
    data?: any[];
    modalIsOpen?: boolean;
    modalData?: any;
    modalAction?: (d: any) => void;
}

interface ITeamsPageDispatch {
    changeData(data: any[]);
    changeModalData(data: any);
    changeModalVisible(modalIsOpen: boolean);
    changeModalAction(modalAction: (d: any) => void);
}

type TeamsPageProps = ITeamsPageState & ITeamsPageDispatch;

@connect<TeamsPageProps>(mapStateToProps, mapDispatchToProps)
export default class TeamsPage extends React.Component<TeamsPageProps, any> {
    defaultProps = {
        data: [],
        modalIsOpen: false,
        modalData: defaultModalData,
        modalAction: null
    };
    constructor(props) {
        super(props);
    }
    render() {
        console.log("TableViewRender", this.props);
        return (
            <Container>
                <Header content='Teams' />
                <TeamsView 
                    headers={headers}
                    modalFields={modalFields}
                    api={api.teams}
                    defaultModalData={defaultModalData}
                    data={this.props.data}
                    modalData={this.props.modalData}
                    modalIsOpen={this.props.modalIsOpen}
                    modalAction={this.props.modalAction}
                    changeData={this.props.changeData}
                    changeModalData={this.props.changeModalData}
                    changeModalVisible={this.props.changeModalVisible}
                    changeModalAction={this.props.changeModalAction}
                    />
            </Container>
        );
    }
}
