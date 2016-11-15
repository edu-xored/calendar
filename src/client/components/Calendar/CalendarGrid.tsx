import * as React from 'react';

import Row from './Row';

import '../../styles/calendar-grid';

export default class CalendarGrid extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let grid = document.getElementsByClassName('grid-body-wrapper')[0];
    grid.addEventListener('scroll', this.handleOnGridScroll);
  }

  componentWillUnmount() {
    let grid = document.getElementsByClassName('grid-body-wrapper')[0];
    grid.removeEventListener('scroll', this.handleOnGridScroll);
  }

  render() {
    const members = ["Alex", "Bill", "Jack", "William", "John", "Rob", "Sam", "Bob", "Steve", "Tim"];
    const headerLength = 31;
    const tmCount = members.length;

    let headerRow = <Row id={'header-row'} rowData={ [...Array(headerLength + 1).keys()] } />;
    let teamMembersRows = members.map((member, i) =>
        <Row key={i} id={ `team-row-${i}` } rowData={ [member] } />
    );
    let eventsRows = [...Array(tmCount).keys()].map((i) =>
        <Row key={i} id={ `event-row-${i}` } rowData={ [...Array(headerLength).keys()] } />
    );

    return (
      <div className='calendar-grid'>
        <div className='grid-header'>
          { headerRow }
        </div>
        <div className='grid-body-wrapper'>
          <div className='grid-body'>
            <div className='team-members-column'>
              { teamMembersRows }
            </div>
            <div className='events-list-column'>
              { eventsRows }
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleOnGridScroll() {
    let grid: any, gridHeader: any;

    grid = document.getElementsByClassName('grid-body-wrapper')[0];
    gridHeader = document.getElementsByClassName('grid-header')[0];
    gridHeader.style.left = `${-grid.scrollLeft}px`;
  }
}
