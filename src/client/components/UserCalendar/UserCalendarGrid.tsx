import * as React from 'react';
import * as moment from 'moment';

import Cell from './Cell';

import './style.scss';

const COUNT_ROWS = 6;
const COUNT_COLUMNS = 7;


interface IUserCalandarGridProps {
    month: number;
    year: number;
    onCellClickHandle(date: Date);
    onClickChangeMonthButton(id: string);
}

const weekday = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
/*
export default class UserCaledarGrid extends React.Component<IUserCalandarGridProps, {}> {
    constructor(props) {
        super(props);

    }
    
    renderTable(year: number, month: number) {

        let d = Moment([year, month, 0]);

        console.log(d);

        let table: any[];
        while ( d.day() % 7 != 0)
            d.subtract(1, 'days');

        table = [...Array(COUNT_ROWS).keys()].map(
            (i) => {
                    let row = [...Array(COUNT_COLUMNS).keys()].map(
                        (j) => {
                            d.add(1, 'days');
                            
                            return (
                                <td key={d.format('D M')}>
                                    {
                                        d.month() === month 
                                        ? 
                                        <Cell value={d.date()} onCellClickHandle={this.props.onCellClickHandle.bind(this)} />
                                        :
                                        <Cell value={d.date()} isEnable={false} onCellClickHandle={this.props.onCellClickHandle.bind(this)} />
                                    }
                               </td>
                            );
                        }
                    
                    );
                return (
                    <tr key={i}>
                        {row}
                    </tr>
                );
            }
        );
        return (
            <tbody>
                {table}
            </tbody>

        );
    }
    
    renderTableHeader() {

        let header = [...Array(weekday.length).keys()].map(
            index => {
                return(
                    <td key={index}>
                        <div  className='cell days-of-week'>
                            {weekday[index]}
                        </div>
                    </td>
                );
            }
        );

        return(
            <thead>
                <tr>
                    {header}
                </tr>
            </thead>
        );
    }

    render() {
        return(
        <div id="user-calendar-grid">
            <div id="decrease-month" onClick={this.props.onClickChangeMonthButton.bind(this)}>
                <div className='to-left-triangle'/>
            </div> 
            <div>
                <table>
                    {this.renderTableHeader()}
                    {this.renderTable(this.props.year, this.props.month)}
                </table>
            </div>
            <div id="increase-month" onClick={this.props.onClickChangeMonthButton.bind(this)}>
                <div className='to-right-triangle'/>
            </div>
        </div>    
        );
    }
}
*/


export default class UserCaledarGrid extends React.Component<IUserCalandarGridProps, {}> {
    
    renderHeader() {
        let header: any[] = [...Array(weekday.length).keys()].map(
            index => {
                return(
                    <td key={index}>
                        <div  className='cell cell-enable'>
                            {weekday[index]}
                        </div>
                    </td>
                );
            }
        );

        return(
            <table>
                <tbody>
                    <tr>
                        {header}
                    </tr>
                </tbody>
            </table>
        )
    }

    renderGrid() {

        let actual_calendar = moment([this.props.year, this.props.month, 1]);
        if (actual_calendar.isValid()) {
            while (actual_calendar.day() != 1)
                actual_calendar = actual_calendar.subtract(1, 'days');
            actual_calendar = actual_calendar.subtract(1, 'days');
        }
        let table: any[];

        table = [...Array(COUNT_ROWS).keys()].map(
            (i) => {
                    let row = [...Array(COUNT_COLUMNS).keys()].map(
                        (j) => {
                            actual_calendar = actual_calendar.add(1, 'days');
                            return (
                                <td key={actual_calendar.format('D M Y')}>
                                    {
                                        <Cell 
                                            date={actual_calendar.toDate()}
                                            isEnable={actual_calendar.month() === this.props.month} 
                                            onCellClickHandle={this.props.onCellClickHandle.bind(this)} />
                                    }
                               </td>
                            );
                        }
                    
                    );
                return (
                    <tr key={i}>
                        {row}
                    </tr>
                );
            }
        );
        return (
            <table>
                <tbody>
                    {table}
                </tbody>
            </table>
        );
    }

    onClickChangeMonth(e: any) {
        console.log(e.target.id);
        this.props.onClickChangeMonthButton(e);
    }

    render() {
        return(
            <div className='user-calendar-grid-view'>
                    <div id='user-calendar-grid-header'>
                        {this.renderHeader()}
                    </div>
                    <div className="body-of-user-calendar">
                        <div className="content-inline">
                            <div className='decrease-month-zone'>
                                    <div id='decrease-month' onClick={this.onClickChangeMonth.bind(this)}/>
                            </div>
                            <div id='user-calendar-grid'>
                                {this.renderGrid()}
                            </div>
                            <div className='increase-month-zone'>
                                    <div id='increase-month' onClick={this.onClickChangeMonth.bind(this)}/>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}