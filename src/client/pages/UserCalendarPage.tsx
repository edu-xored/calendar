import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as moment from 'moment';
import history from './../history';
import * as Actions from './../actions/UserCalendar';

import UserCalendarGrid from './../components/UserCalendar/UserCalendarGrid';
import ReportButtonsPanel from './../components/UserCalendar/ReportButtonsPanel';

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
        enterStartDate: bindActionCreators(Actions.setEnterStartDate, dispatch),
        enterEndDate: bindActionCreators(Actions.setEnterEndDate, dispatch),
        enterCalendarGrid: bindActionCreators(Actions.setEnterCalendarGrid, dispatch),
        setTypeOfEvent: bindActionCreators(Actions.setTypeOfEvent, dispatch)
    });
}

interface IUserCalendarPageState {
    enterStartDate: any;
    enterEndDate: any;
    enterCalendarGrid: Actions.calendarGrid;
    typeOfEvent: string;
}

interface IUserCalendarPageDispatch {
    setEnterStartDate(enterStartDate: any);
    setEnterEndDate(enterEndDate: any);
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
        enterStartDate: moment(),
        enterEndDate: moment(),
        enterCalendarGrid: {month: moment().month(), year: moment().year()}
    }

    constructor(props) {
        super(props);
        this.state = {enterDate: START_DATE};
    }

    onClickChangeMonthButton(e: any) {
        let enterTime = moment([this.props.enterCalendarGrid.year, this.props.enterCalendarGrid.month]);

        switch(e.target.id) {
            case 'increase_month':
                enterTime.add(1, 'months');
                break;
            case 'decrease_month':
                enterTime.subtract(1, 'months');
                break;
        }

        this.props.setEnterCalendarGrid({month: enterTime.month(), year: enterTime.year()});
    }

    onReportButtonClick(buttonId: any) {
        this.props.setTypeOfEvent(buttonId);
        history.push('trackstatuspage');
    }

    onCellClickHandle(date) {
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
            <div>
                <div id='head-of-calendar'>
                    <span className='status'>Status</span>
                    <span className='statistic'>Statistic</span>
                </div>
                <div>
                    <div id="displayer">
                        <span id="month">
                            {cd.format('MMMM')}
                        </span>
                        <span id="year">
                            {cd.format('YYYY')}
                        </span>
                    </div>
                </div>
                <div>
                    <UserCalendarGrid 
                        month={this.props.enterCalendarGrid.month} 
                        year={this.props.enterCalendarGrid.year} 
                        onCellClickHandle={this.onCellClickHandle} 
                        onClickChangeMonthButton={this.onClickChangeMonthButton}
                    />
                </div>
                <div className='button-panel'>
                    <ReportButtonsPanel onReportButtonClick={this.onReportButtonClick} />
                </div>
            </div>
        );
    }
}