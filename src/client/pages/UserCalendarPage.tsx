import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as moment from 'moment';


import UserCalendarView from './../components/UserCalendar/UserCalendarView';
import * as Actions from './../actions/UserCalendar';


function mapStateToProps(state) {
    return ({
        enterDate: state.userCalendar.enterDate,
        enterMonth: state.userCalendar.enterMonth,
        enterYear: state.userCalendar.enterYear,
        caledarId: state.userCalendar.caledarId,
        typeOfEvent: state.userCalendar.typeOfEvent
    });
}

function mapDispatchToProps(dispatch) {
    return ({
        setEnterDate: bindActionCreators(Actions.setEnterDate, dispatch),
        setEnterMonth: bindActionCreators(Actions.setEnterMonth, dispatch),
        setEnterYear: bindActionCreators(Actions.setEnterYear, dispatch),
        setCalendarId: bindActionCreators(Actions.setCalendarId, dispatch),
        setTypeOfEvent: bindActionCreators(Actions.setTypeOfEvent, dispatch)
    });
}

interface IUserCalendarPageState {
    enterDate: number;
    enterMonth: number;
    enterYear: number;
    caledarId: string;
    typeOfEvent: string;
}

interface IUserCalendarPageDispatch {
    setEnterDate(enterDate: number);
    setEnterMonth(enterMonth: number);
    setEnterYear(enterYear: number);
    setCalendarId(calendarId: string);
    setTypeOfEvent(typeOfEvent: string);
}

type IUserCalendarPageProps = IUserCalendarPageState & IUserCalendarPageDispatch;

@connect<IUserCalendarPageProps>(mapStateToProps, mapDispatchToProps)
export default class UserCalendarPage extends React.Component<IUserCalendarPageProps, {}> {
    static defaultProps = {
        typeOfEvent: '',
        caledarId: '',
        enterDate: moment().date(),
        enterMonth: moment().month(),
        enterYear: moment().year()
    }

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <UserCalendarView 
                    enterDate={this.props.enterDate}
                    enterMonth={this.props.enterMonth}
                    enterYear={this.props.enterYear}
                    caledarId={this.props.caledarId}
                    typeOfEvent={this.props.typeOfEvent}
                    setEnterDate={this.props.setEnterDate}
                    setEnterMonth={this.props.setEnterMonth}
                    setEnterYear={this.props.setEnterYear}
                    setCalendarId={this.props.setCalendarId}
                    setTypeOfEvent={this.props.setTypeOfEvent}
                />
            </div>
        );
    }
}