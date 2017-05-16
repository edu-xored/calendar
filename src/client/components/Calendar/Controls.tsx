import * as React from 'react';

import Row from './Row';

export default class Controls extends React.Component<any, any> {
  private static weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

  constructor() {
    super();
    this.state = {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth()
    };
  }

  render() {
    const headerRowData = this.getHeaderRowData(this.props.currentMonth, this.props.currentYear);
    const headerRow = (
      <Row id="header-row"
           rowData={ headerRowData }
           handleOnCellClick={ () => {} }
      />
    );
    return (
      <div className='calendar-controls-wrapper'>
        <div className='controls-row'>
          <div className='current-year'>
            <h3>{ this.props.currentYear }</h3>
          </div>
        </div>
        <div className='dates-row'>
          { headerRow }
        </div>
      </div>
    );
  }

  getHeaderRowData(month: number, year: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return [...Array(daysInMonth).keys()].map(index => {
      return {
        type: 'date',
        content: {
          date: index + 1,
          day: Controls.weekday[(firstDay + index) % 7]
        }
      };
    });
  }
}
