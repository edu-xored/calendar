import * as React from 'react';
import * as Moment from 'moment';

import Cell from './Cell';

const COUNT_ROWS = 6;
const COUNT_COLUMNS = 7;


interface IUserCalandarGridProps {
    month: number;
    year: number;
    onCellClickHandle(date: any);
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
                        <div  className='cell days-of-week'>
                            {weekday[index]}
                        </div>
                    </td>
                );
            }
        );

        return(
            <table id='header-of-user-calendar-grid'>
                <tbody>
                    <tr>
                        {header}
                    </tr>
                </tbody>
            </table>
        )
    }

    renderGrid() {

        let actual_calendar = Moment([this.props.year, this.props.month, 1]);
        while (actual_calendar.day() != 1) {
            actual_calendar.subtract(1, 'days');
        }

        let table: any[];

        table = [...Array(COUNT_ROWS).keys()].map(
            (i) => {
                    let row = [...Array(COUNT_COLUMNS).keys()].map(
                        (j) => {
                            actual_calendar.add(1, 'days');
                            
                            return (
                                <td key={actual_calendar.format('D M Y')}>
                                    {
                                        actual_calendar.month() === this.props.month 
                                        ? 
                                        <Cell date={actual_calendar} onCellClickHandle={this.props.onCellClickHandle.bind(this)} />
                                        :
                                        <Cell date={actual_calendar} isEnable={false} onCellClickHandle={this.props.onCellClickHandle.bind(this)} />
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
            <table id='user-calendar-grid'>
                <tbody>
                    {table}
                </tbody>
            </table>
        );
    }

    render() {
        return(
            <div>
                <div className="center bottom-header">
                    {this.renderHeader()}
                </div>
                <div className="center content-inline">
                    <div>
                        <div id="decrease-month" onClick={this.props.onClickChangeMonthButton.bind(this)}/>
                    </div>
                    <div>
                        {this.renderGrid()}
                    </div>
                    <div>
                        <div id="increase-month" onClick={this.props.onClickChangeMonthButton.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}