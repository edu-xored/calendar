import * as React from "react";
import * as ReactDOM from "react-dom";
import "./calendar/semantic/semantic.css"

export interface CardProps {side_:string; username_:string; role_:string; image_src_:string; command_: string; position_:string; place_: string; script_: string;}

interface Front_cardProps{username_:string; role_:string; image_src_:string;}
interface Back_cardProps{command_: string; position_:string; place_: string; script_: string;}
interface IState_card{side_card_flag:string}

//constants
export var FRONT_SIDE = "front_side";
export var BACK_SIDE = "back_side";

//export class Card extends React.Component<CardProps, {}> {
  //  render() {
  //      return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
  //  }
//}

class Front_card extends React.Component<Front_cardProps, {}> {
  render() {
  return (
      <div className="ui.card">
            <img src={this.props.image_src_}  alt="Avatar"/>
            <div >
                <h3><a>{this.props.username_}</a>></h3>
                <h4>{this.props.role_}</h4>
            </div>
      </div>
    );
  }
}


class Back_card extends React.Component<Back_cardProps, {}> {
  render() {
    return (
      <div className="ui.card">
            <div ><a >{this.props.command_}</a></div>
            <div ><p >{this.props.position_}</p></div>
            <div ><p >{this.props.place_}</p></div>
            <div ><p >{this.props.script_}</p></div>
      </div>
    );
  }
}


export class Card extends React.Component<CardProps, IState_card> {
  constructor(props:CardProps) {
      super(props);
      this.state = {side_card_flag: this.props.side_};
  }
  onSwap() :void {
    var st:string = this.state.side_card_flag;
    if (st == FRONT_SIDE) {
      this.setState({side_card_flag: BACK_SIDE});
    }
    else if (st == BACK_SIDE) {
      this.setState({side_card_flag: FRONT_SIDE});
    }
  }
  render() {
    var st:string = this.state.side_card_flag;
    if (st == FRONT_SIDE) {
        return (
          <div onClick={this.onSwap.bind(this)}>
             <Front_card username_={this.props.username_} role_={this.props.role_} image_src_={this.props.image_src_} />,
          </div>
        );
    }
    else if (st == BACK_SIDE) {
      return (
        <div onClick={this.onSwap.bind(this)}>
          <Back_card command_={this.props.command_} position_={this.props.position_} place_={this.props.place_} script_={this.props.script_} />
        </div>
      );
    }
  }
}
