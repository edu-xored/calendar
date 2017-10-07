import * as React from 'react';
import * as Moment from 'moment';
import API from '../../api';
import history from './../../history';
import {Event, User} from '../../../lib/model';


interface ITSPProps {
    type: string;
    startDate: any;
    endDate: any;
    calendarId: (user: User) => Promise<string>;
    user: User;
}

interface ITSPState {
    commentText: string;
}

export default class TrackStatusPage extends React.Component<ITSPProps, ITSPState> {

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
        return (
            <div>
                <div>
                    <span>
                        <div>
                            {
                                //this.props.date.format('D MMMM')
                            }
                        </div>
                    </span>
                    <span>
                        <div>
                            {
                                //this.props.date.format('YYYY')
                            }
                        </div>
                    </span>
                </div>
                <div>
                    <div>
                        <h2> {this.props.type} </h2>
                    </div>
                    <div>
                        {
                        this.props.type === 'PTO/2' ? 
                        () => (
                            <div>
                                <span>
                                    <div>
                                        MORNING
                                    </div>
                                </span>
                                <span>
                                    <div>
                                        EVENING
                                    </div>
                                </span>
                            </div>
                        )
                        :
                        <div>
                        </div>
                        }
                        <div>
                             WFH
                        </div>
                        <div>
                            MESSAGE
                        </div>
                        <div>
                            •••
                        </div>

                    </div>
                    <div>
                        <div id='CONFIRM' onClick={this.onClickConfirm.bind(this)}>
                            CONFIRM
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}