import * as React from "react";
import * as ReactDOM from "react-dom";
import {Card} from '../components/Profile/Card';


export default class ProfilePage extends React.Component<{}, {}> {
  render() {
    return (
      <div style={{
                    display:"inline-block",
                    margin: "20px 50px"
                  }}>
          <div className="" style={{float:"left"}}>
            <Card />
          </div>
          <div style={{
                border:"1px solid black",
                marginLeft:"20px",
                float:"left"
                         }}>
              <h3>Activity</h3>
              <div style={{
                    border:"1px solid black",
                    margin:"10px"
                  }}>
                  <h5>3 days ago</h5>
                  <p>qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq</p>
              </div>
              <div style={{
                    border:"1px solid black",
                    margin:"10px"}}>
                  <h5>2 days ago</h5>
                  <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
              </div>
              <div style={{
                    border:"1px solid black",
                    margin:"10px"
                  }}>
                  <h5>Yesterday</h5>
                  <p>mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</p>
              </div>
          </div>
        </div>
    );
  }
}
