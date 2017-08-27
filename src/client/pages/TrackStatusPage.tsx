import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';

import TrackStatusView from '../components/UserCalendar/TrackStatusView';


function mapStateToProps(state) {
    return ({
        enterDate: state.userCalendar.enterDate,
        enterMonth: state.userCalendar.enterMonth,
        enterYear: state.userCalendar.enterYear,
        caledarId: state.userCalendar.calendarId,
        typeOfEvent: state.userCalendar.typeOfEvent
    });
}

interface ITrackStatusPageProps {
    enterDate: number;
    enterMonth: number;
    enterYear: number;
    caledarId: string;
    typeOfEvent: string;
}

@connect<ITrackStatusPageProps>(mapStateToProps)
export default class TrackStatusPage extends React.Component<ITrackStatusPageProps, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        let time = moment([this.props.enterYear, this.props.enterMonth, this.props.enterDate]);
        console.log(time);
        return (
            <div>
                <TrackStatusView type={this.props.typeOfEvent} date={time} calendarId={this.props.caledarId} userId='' />
            </div>    
        );
    }
}
