import * as _ from 'lodash';
import * as React from "react";

interface IActivityItemProps {
  messageId: number;
  date: string;
  description: string;
}

class ActivityItem extends React.Component<IActivityItemProps, {}> {
  render() {
    return(
      <li className="ui segment" style={{margin:"10px"}}>
        <div className="contetnt">
            <div className="header">
                <h5>{"Date: " + this.props.date}</h5>
            </div>
            <div className="description">
                <p>{this.props.description}</p>
            </div>
        </div>
      </li>
    );
  }
}

export interface IActivity {
  data: IActivityItemProps[];
}

export class Activity extends React.Component<IActivity, {}> {
  renderItems() {
    return _.map(this.props.data, (item, i) => (
      <ActivityItem key={i}
        messageId={item.messageId}
        date={item.date}
        description={item.description}/>
    ));
  }

  render() {
    return(
      <div id="Activity" className="ui vertical stripe quote segment">
        <h3>Activity</h3>
        <ul  type = "none" className="ui container">
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}
