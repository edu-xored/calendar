import * as React from 'react';
import * as Moment from 'moment';
import connect from 'react-redux';
import history from './../../history';

import UserCalendarGrid from './UserCalendarGrid';
import ReportButtonsPanel from './ReportButtonsPanel';
import './style';

interface IUserCalendarViewProps {
    enterDate: number;
    enterMonth: number;
    enterYear: number;
    caledarId: string;
    typeOfEvent: string;
    setEnterDate(enterDate: number);
    setEnterMonth(enterMonth: number);
    setEnterYear(enterYear: number);
    setCalendarId(calendarId: string);
    setTypeOfEvent(typeOfEvent: string);
};

export default class UserCalendarView extends React.Component<IUserCalendarViewProps, {}> {

    constructor(props) {
        super(props);

    }

    onReportButtonClick(e) {
        console.log(e.target.id);
        //this.props.setTypeOfEvent(e.target.id);
        //this.props.setCalendarId('userCalendar');
        history.push('trackstatuspage');
    }

    onCellClickHandle(valueOfCell) {
       console.log(valueOfCell);
       //this.props.setEnterDate(valueOfCell);
    }

    render() {
        let now = Moment();

        this.props.setEnterMonth(now.month());
        this.props.setEnterYear(now.year());

        return (
            <div style={
                {
                    width: '280px',
                    marginLeft: '10px'
                }
            }>
                <div style={{
                        fontSize: '15px'
                    }}>
                    <span style={{width: '50%', textAlign: 'left'}}>Status</span>
                    <span style={{marginLeft: '20px', width: '50%', textAlign: 'right'}}>Statisctic</span>
                </div>
                <div style={{height: '50px'}}>
                    <span>
                        <div style={
                            {
                                width: '50%',
                                color: '#FFFFFF',
                                background: '#000FFF',
                                height: '100%'
                            }
                            }>
                            <span style={{fontSize: '30px'}}>
                                    {now.format('MMMM')}
                            </span>
                            <span style={{fontSize: '15px', marginLeft: '10px'}}>
                                    {now.format('YYYY')}
                            </span>
                        </div>
                    </span>
                    <span>
                    </span>
                </div>
                <div className='calendar-grid'>
                    <UserCalendarGrid year={now.year()} month={now.month()} onCellClickHandle={this.onCellClickHandle.bind(this)}/>
                </div>
                <div className='button-panel'>
                    <ReportButtonsPanel onReportButtonClick={this.onReportButtonClick} />
                </div>
            </div>
        );
    }

}