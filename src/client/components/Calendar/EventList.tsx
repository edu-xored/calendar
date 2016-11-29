import * as React from 'react';

import { Popup } from 'semantic-ui-react';

export default class EventList extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document
      .getElementsByClassName('')
  }

  render() {
    const eventList = this.props.eventList;
    const paragraph = (
      <div className={ eventList.length == 1 ? '' : 'events-count-info' }>
        {
          eventList.length == 1?
            eventList[0].comment :
            eventList.length + " events..."
        }
      </div>
    );

    let popup = undefined;
    if (eventList.length > 1) {
      popup = (
        <Popup trigger={ paragraph } positioning='bottom center' header='Event List' hoverable>
          {eventList.map((event, i) => <p key={i} className='event-list-comment'> {event.comment} </p>)}
        </Popup>
      );
    }

    const colors = this.props.colors;
    return (
      <div className='incell-event-list' style={ {'background': colors.bgColor, 'color': colors.textColor} }>
        {
          eventList.length > 1? popup : paragraph
        }
      </div>
    );
  }
}
