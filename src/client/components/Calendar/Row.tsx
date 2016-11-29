import * as React from 'react';

import EventList from './EventList';
import Cell from './Cell';


export default class Row extends React.Component<any, any> {
  render() {
    return (
      <div className='grid-row' id={this.props.id}>
        {
          this.props.rowData.map((cellData, i) => {
            return (
              <Cell key={i} date={i} handleOnCellClick={ this.handleOnCellClick.bind(this) }>
                { prepareData(cellData) }
              </Cell>
            );
          })
        }
      </div>
    );
  }

  handleOnCellClick(eventType, date) {
    this.props.handleOnCellClick(eventType, date, +this.props.userId);
  }
}

const prepareData = (data) => {
  switch(data.type) {
    case 'user':
      return getUserComponent(data.content);
    case 'date':
      return getDateComponent(data.content);
    case 'event':
      return getEventComponent(data.content);
    default:
      return undefined;
  }
}

const getUserComponent = (user) => {
  return (
    <div className='user-data-cell'>
      <h5>
        {user.name}
      </h5>
    </div>
  );
}

const getDateComponent = (date) => {
  return (
    <div className='date-data-cell'>
      <p>
        { `${date.day} ${date.date}` }
      </p>
    </div>
  );
}

const eventColors = [
  {textColor: '#F7C413', bgColor: 'rgba(255,252,124,0.3)'}, // yellow
  {textColor: '#4CC93C', bgColor: 'rgba(155,255,90,0.3)'}, // green
  {textColor: '#2C4163', bgColor: 'rgba(114,134,255,0.3)'}, // blue
  {textColor: '#5828A3', bgColor: 'rgba(123,55,217,0.3)'}, // violet
  {textColor: '#E5A625', bgColor: 'rgba(255,214,66,0.3)'}, // orange
  {textColor: '#CF2719', bgColor: 'rgba(255,127,90,0.3)'} // redish
];

const getEventComponent = (content) => {
  if (content.eventList.length == 0) return undefined;

  const colorIndex = content.eventList[0].id % eventColors.length;
  const colors = eventColors[colorIndex];
  return <EventList eventList={ content.eventList } colors={ colors }/>
}
