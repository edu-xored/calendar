import * as React from 'react';

import Row from './Row';

import '../../styles/calendar-grid';

const members = ["Alex", "Bill", "Jack", "William", "John", "Rob", "Sam", "Bob", "Steve", "Tim"];
const headerLength = 31;
const tmCount = members.length;

const fakeEventRows = [...Array(tmCount).keys()].map((rowIndex) =>
    <Row
      key={rowIndex}
      id={ `event-row-${rowIndex}` }
      rowData={ [...Array(headerLength).keys()].map(k => '') }
      handleOnCellClick={ () => {} } />
);


export default class CalendarGrid extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let grid = document.getElementsByClassName('grid-body')[0];
    grid.addEventListener('scroll', this.handleOnGridScroll.bind(this));
  }

  componentWillUnmount() {
    let grid = document.getElementsByClassName('grid-body')[0];
    grid.removeEventListener('scroll', this.handleOnGridScroll.bind(this));
  }

  render() {
    const eventsRows = [...Array(this.props.data.length).keys()].map( rowIndex =>
        <Row
          key={rowIndex}
          userId={ this.props.data[rowIndex].user.id }
          id={ `event-row-${rowIndex}` }
          rowData={[...Array(this.props.gridWidth).keys()].map(cellIndex => (
            {
              type: 'event',
              content: {
                eventList: this.getEventList(rowIndex, cellIndex + 1)
              }
            }
          ))}
          handleOnCellClick={ this.props.handleOnEventCellClick }
        />
    );

    return (
      <div className='calendar-grid'>
        <div className='grid-body'>
          <div className='events-list-column'>
            { eventsRows }
          </div>
        </div>
      </div>
    );
  }

  handleOnGridScroll() {
    let grid: any, gridHeader: any;
    grid = document.getElementsByClassName('grid-body')[0];
    gridHeader = document.getElementsByClassName('dates-row')[0];
    gridHeader.style.left = `${-grid.scrollLeft}px`;

    this.props.syncScrollPosition('grid-body');
  }

  getEventList(userIndex: number, date: number) {
    return this.props.data[userIndex].events.filter( e => {
      const start = new Date(e.start).getDate() ;
      const end = new Date(e.end).getDate();

      // console.log(start, end);

      return start <= date && date <= end;
    });
  }
}
