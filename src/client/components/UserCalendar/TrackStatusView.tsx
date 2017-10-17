import * as React from 'react';
import * as Moment from 'moment';
import API from '../../api';
import history from './../../history';
import {Event, User} from '../../../lib/model';
import SeasonView from './SeasonView';

import './style.scss';

interface ITSPProps {
    type: string;
    startDate: Date;
    endDate: Date;
    calendarId: (user: User) => Promise<string>;
    user: User;
}

/*
 <div>
                            <div className='content-inline'>
                                <div className='cell'>MORNING</div>
                                <div className='cell'>EVENING</div>
                            </div>
                            <div className='cell'>WFH</div>
                            <div className='cell'>MESSAGE</div>
                            <div className='cell'>•••</div>
                        </div>
*/

interface ITSPState {
    commentText: string;
}

export default class TrackStatusView extends React.Component<ITSPProps, ITSPState> {

    constructor(props) {
        super(props);
        this.state = {commentText: ''};
        console.log("constr view", props);
        
    }

    async onClickConfirm() {
        let calendarId = await this.props.calendarId(this.props.user); 

        let ev: Event;
        ev.type = this.props.type;
        ev.calendarId = calendarId;
        ev.userId = this.props.user.id;
        ev.comment = this.state.commentText;
        ev.duration = this.props.type === 'PTO/2' ? '0.5d' : '1d';
        ev.start = this.props.startDate;
        ev.end = this.props.endDate;

        API.events.create(ev).then( 
            d => console.log(d)
        );
        history.push('usercalendar');
    }

    render() {
        let stime = Moment(this.props.startDate);
        let etime = Moment(this.props.endDate);
        return (
            <div id='track-status-view'>
                <div className='head-track-status-view'>
                    <SeasonView className='sv-b-white' bold_part={stime.format('D MMMM')} nobold_part={stime.format('YYYY')}/>
                </div>
                <div className='content'>
                    <div>
                        <div className='header'> {this.props.type} </div>
                    </div>
                    <div>
                        <table className='button-table'>
                            <thead>
                                <tr>
                                    <td>MORNING</td>
                                    <td>EVENING</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>WFH</td>
                                </tr>
                                <tr>
                                    <td className='triangle' colSpan={2}>MESSAGE</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>• • •</td>
                                </tr>
                            </thead>
                        </table>
                        <div>
                            <div className='confirm-button' onClick={this.onClickConfirm.bind(this)}>
                                CONFIRM
                            </div>
                        </div>
                    </div>
            </div>
        </div> 
        );
    }
}