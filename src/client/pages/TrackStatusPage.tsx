import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import TrackStatusView from '../components/UserCalendar/TrackStatusView';
import getCalendarId from './../components/UserCalendar/getCalendarId';
import {User} from '../../lib/model';

function mapStateToProps(state) {
    return ({
        enterStartDate: state.userCalendar.enterStartDate,
        enterEndDate: state.userCalendar.enterEndDate,
        typeOfEvent: state.userCalendar.typeOfEvent,
        user: state.login.user
    });
}

interface ITrackStatusPageProps {
    enterStartDate: any;
    enterEndDate: any;
    typeOfEvent: string;
    user: User;
}

@connect<ITrackStatusPageProps>(mapStateToProps)
export default class TrackStatusPage extends React.Component<ITrackStatusPageProps, {}> {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
            <TrackStatusView 
                type={this.props.typeOfEvent} 
                startDate={this.props.enterStartDate}
                endDate={this.props.enterEndDate}
                calendarId={getCalendarId} 
                user={this.props.user} 
            />
        </div>    
        );
    }
}
