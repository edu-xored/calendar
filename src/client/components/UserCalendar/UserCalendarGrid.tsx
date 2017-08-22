import * as React from 'react';
import * as Moment from 'moment';

import Cell from './Cell';

const COUNT_ROWS = 5;
const COUNT_COLUMNS = 7;


interface IUserCalandarGridProps {
    month: number;
    year: number;
    onCellClickHandle(value: number);
}

const weekday = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default class UserCaledarGrid extends React.Component<IUserCalandarGridProps, {}> {
    constructor(props) {
        super(props);

    }
    
    renderTable(year: number, month: number) {

        let d = Moment([year, month]);

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
                        <div className='cell'>
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
            <table>
                {this.renderTableHeader()}
                {this.renderTable(this.props.year, this.props.month)}
            </table>
        );
    }
}