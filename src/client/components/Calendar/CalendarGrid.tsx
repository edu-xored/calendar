import * as React from 'react';

import Row from './Row';

import '../../styles/calendar-grid';

const members = ["Alex", "Bill", "Jack", "William", "John", "Rob", "Sam", "Bob", "Steve", "Tim"];
const headerLength = 31;
const tmCount = members.length;

const fakeEventRows = [...Array(tmCount).keys()].map((i) =>
    <Row
      key={i}
      id={ `event-row-${i}` }
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
    // this.props.data.map((row, index) => {
    //   eventsRows.push(
    //     <Row
    //       key={index}
    //       id={ `event-row-${index}` }
    //       rowData={ row.events }
    //       handleOnCellClick={ this.props.handleOnEventCellClick }
    //     />
    //   );
    // });
    const eventsRows = [...Array(this.props.data.length).keys()].map((i) =>
        <Row
          key={i}
          id={ `event-row-${i}` }
          rowData={ [...Array(this.props.gridWidth).keys()].map(k => ({type: '', content: {}})) }
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
    gridHeader = document.getElementsByClassName('grid-header')[0];
    gridHeader.style.left = `${-grid.scrollLeft}px`;

    this.props.syncScrollPosition('grid-body');
  }
}
