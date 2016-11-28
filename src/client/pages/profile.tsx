import * as React from "react";
import * as ReactDOM from "react-dom";
import {Card} from '../components/Profile/Card';
import {Activity} from '../components/Profile/Activity';

let data =[
  {
    messageId: 0,
    date: "20.11.16",
    description: "PTO"
  },
  {
    messageId: 1,
    date: "24.11.16",
    description: "PTO"
  },
  {
    messageId: 2,
    date: "29.11.16",
    description: "PTO"
  }
];


export default class ProfilePage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="ui grid container" style={{marginTop:"20px"}}>
          <div className="four wide column">
              <Card />
          </div>
          <div  className="twelve wide column">
            <div className="ui segment">
              <Activity data={data}/>
            </div>
          </div>
        </div>
    );
  }
}
