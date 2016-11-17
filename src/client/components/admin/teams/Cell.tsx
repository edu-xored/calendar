import * as React from 'react';

import '../../../styles/calendar-grid';

export default class Cell extends React.Component<any, any> {
  render() {
    return (
      <div className='grid-cell'>
        { this.props.data }
      </div>
    );
  }
}
