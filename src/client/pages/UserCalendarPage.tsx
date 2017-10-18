import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as moment from 'moment';
import history from './../history';
import * as Actions from './../actions/UserCalendar';

import UserCalendarGrid from './../components/UserCalendar/UserCalendarGrid';
import ReportButtonsPanel from './../components/UserCalendar/ReportButtonsPanel';
import SeasonView from './../components/UserCalendar/SeasonView';

function mapStateToProps(state) {
    return ({
        enterStartDate: state.userCalendar.enterStartDate,
        enterEndDate: state.userCalendar.enterEndDate,
        enterCalendarGrid: state.userCalendar.enterCalendarGrid,
        typeOfEvent: state.userCalendar.typeOfEvent
    });
}

function mapDispatchToProps(dispatch) {
    return ({
        setEnterStartDate: bindActionCreators(Actions.setEnterStartDate, dispatch),
        setEnterEndDate: bindActionCreators(Actions.setEnterEndDate, dispatch),
        setEnterCalendarGrid: bindActionCreators(Actions.setEnterCalendarGrid, dispatch),
        setTypeOfEvent: bindActionCreators(Actions.setTypeOfEvent, dispatch)
    });
}

interface IUserCalendarPageState {
    enterStartDate: Date;
    enterEndDate: Date;
    enterCalendarGrid: Actions.calendarGrid;
    typeOfEvent: string;
}

interface IUserCalendarPageDispatch {
    setEnterStartDate(enterStartDate: Date);
    setEnterEndDate(enterEndDate: Date);
    setTypeOfEvent(typeOfEvent: string);
    setEnterCalendarGrid(enterCalendarGrid: Actions.calendarGrid);
}

interface IUserCalendarPageLocalState {
    enterDate: string;
}

const END_DATE = "END_DATE";
const START_DATE = "START_DATE";

type IUserCalendarPageProps = IUserCalendarPageState & IUserCalendarPageDispatch;

@connect<IUserCalendarPageProps>(mapStateToProps, mapDispatchToProps)
export default class UserCalendarPage extends React.Component<IUserCalendarPageProps, IUserCalendarPageLocalState> {
    static defaultProps = {
        typeOfEvent: '',
        enterStartDate: moment().toDate(),
        enterEndDate: moment().toDate(),
        enterCalendarGrid: {month: moment().month(), year: moment().year()}
    }

    static defaultState = {

    }
    constructor(props) {
        super(props);
        this.state = {enterDate: START_DATE};
        console.log(this.state);
        this.props.setTypeOfEvent('');
        this.props.setEnterCalendarGrid({month: moment().month(), year: moment().year()});
        this.props.setEnterStartDate(moment().toDate());
        this.props.setEnterEndDate(moment().toDate());
    }

    onClickChangeMonthButton(e: any) {
        let enterTime = moment([this.props.enterCalendarGrid.year, this.props.enterCalendarGrid.month]);
        console.log(e.target.id);
        switch(e.target.id) {
            case 'increase-month':   
                enterTime = enterTime.add(1, 'months');
                break;
            case 'decrease-month':
                enterTime = enterTime.subtract(1, 'months');
                break;
        }
        console.log(enterTime.month(), enterTime.year());
        this.props.setEnterCalendarGrid({month: enterTime.month(), year: enterTime.year()});
    }

    onReportButtonClick(buttonId: any) {
        this.props.setTypeOfEvent(buttonId);
        history.push('trackstatuspage');
    }

    onCellClickHandle(date) {
        console.log(this.state);
       if (this.state.enterDate === START_DATE) {
            this.props.setEnterStartDate(date);
            this.setState({enterDate: END_DATE});
       }
       else if (this.state.enterDate === END_DATE) {
            this.props.setEnterEndDate(date);
            this.setState({enterDate: START_DATE});
       }
    }

    render() {
        let cd = moment([this.props.enterCalendarGrid.year, this.props.enterCalendarGrid.month]);

        return(
            <div id='user-calendar-page'>
                <div id='head-of-user-calendar'>
                    <div className='status'>Status</div>
                    <div className='statistic'>Statistic</div>
                </div>
                <div>
                    <SeasonView className='sv-b-blue' bold_part={cd.format('MMMM')} nobold_part={cd.format('YYYY')} />
                </div>
                <div>
                    <UserCalendarGrid 
                        month={cd.month()} 
                        year={cd.year()} 
                        onCellClickHandle={this.onCellClickHandle.bind(this)} 
                        onClickChangeMonthButton={this.onClickChangeMonthButton.bind(this)}
                    />
                </div>
                <div>
                    <ReportButtonsPanel onReportButtonClick={this.onReportButtonClick.bind(this)} />
                </div>
            </div>
        );
    }
}