import * as React from "react";
import { render } from 'react-dom';

export interface CardProps {username_:string; role_:string; image_src_:string; command_: string; position_:string; place_: string; script_: string;}

interface Front_cardProps{username_:string; role_:string; image_src_:string;}
interface Back_cardProps{command_: string; position_:string; place_: string; script_: string;}



//export class Card extends React.Component<CardProps, {}> {
  //  render() {
  //      return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
  //  }
//}

class Front_card extends React.Component<Front_cardProps, {}> {
  render() {
  return (
      <div>
            <img src={this.props.image_src_} className="Card-image" alt="Avatar"/>
            <div className="Card-script">
                <h3>{this.props.username_}</h3>
                <h4>{this.props.role_}</h4>
            </div>
      </div>
    );
  }
}


export class Card extends React.Component<CardProps, {}> {

  constructor(props:CardProps) {
      super(props);
      this.state = {
      side_card : <Front_card username_={this.props.username_} role_={this.props.role_} image_src_={this.props.image_src_} />,
      count: 0
    //  side_card : "front_card"
    };
  }
  swap() {
    if ({this.state.side_card} == "front_card") {
      setState({side_card: "back_card"});
    }
    else if ({this.state.side_card} == "back_card") {
      setState({side_card: "front_card"});
    }
  }
  render() {
    if (side_card == "front_card") {
      return(
        <div className="Card-main" onClick={this.swap.bind(this)}>
          <Front_card username_={this.props.username_} role_={this.props.role_} image_src_={this.props.image_src_} />
        </div>
      );
    }
    else if (side_card == "back_card") {
      return(
        <div className="Card-main" onClick={this.swap.bind(this)}>
          <Back_card command_={this.props.command_} position_={this.props.position_} place_={this.props.place_} script_={this.props.script_} />
        </div>
      );
    }
  }


}
