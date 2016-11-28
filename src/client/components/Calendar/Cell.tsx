import * as React from 'react';

import Constants from '../constants';

import '../../styles/calendar-grid';

export default class Cell extends React.Component<any, any> {
  render() {
    return (
      <div className='grid-cell' onClick={this.handleOnCellClick.bind(this)}>
        { this.props.children }
      </div>
    );
  }

  handleOnCellClick(e) {
    const parent = e.target.parentNode;
    if (parent.id.includes('event-row')) {
      this.props.handleOnCellClick(Constants.ADD_NEW_EVENT);
    }
    else {
      console.log(`Cell inside ${parent.id} has been clicked`);
    }
  }
}
