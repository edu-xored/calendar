import * as React from "react";
import * as ReactDOM from "react-dom";

interface IActivityItemProps {
  messageId: number;
  date: string;
  description: string;
};

class ActivityItem extends React.Component<IActivityItemProps, {}> {
  constructor(props: IActivityItemProps) {
    super(props);
  }

  render() {
    return(
      <li key={"active" + this.props.messageId.toString()} className="ui segment" style={{margin:"10px"}}>
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
};

export class Activity extends React.Component<IActivity, {}> {
  constructor(props: IActivity) {
    super(props);
  }

  getListItem() {
    const items = this.props.data;
    const listItem = items.map((item) =>
      <ActivityItem
        messageId={item.messageId}
        date={item.date}
        description={item.description}/>
    );
    return listItem;
  }

  render() {
    return(
      <div id="Activity" className="ui vertical stripe quote segment">
        <h3>Activity</h3>
        <ul  type = "none" className="ui container">
          {this.getListItem()}
        </ul>
      </div>
    );
  }
}
