import React, { Component } from 'react';
import React, { render } from 'react-dom';
import logo from './';
import './card_app.css';

class App extends Component {
  render() {
      return (
      <div className="Card-main" onClick=>
            <img src={logo} className="Card-image" alt="Avatar"/>
            <div className="Card-script">
                <h2>Your name</h2>
                <p><a href="" >Work at group</a></p>
                <p>Position at work</p>
                <p>Script</p>
            </div>
      </div>
    );
  }
}


class Front_card extends Component {
    constructor(props){
      super(props);
      username_: this.props.username_;
      position_: this.props.position_;
      image_src_: this.props.image_src_;
    }
    render() {
      return (
        <div className="Card-main" onClick=>
              <img src={image_src_} className="Card-image" alt="Avatar"/>
              <div className="Card-script">
                  <h3>{username_}</h3>
                  <h4>{position_}</h4>
              </div>
          );
        </div>
    }
}

class Back_card extends Component {
  constructor(props){
    super(props);
    command_: this.props.command_;
    task_: this.props.task_;
    state_: this.props.state_;
    script_: this.props.script_;
  }
  render() {
    return();
  }
}


class Card extends Component {
  constructor() {
    this.state = {
    type_name: "front_card";
  }
  }
  swap_card() {

  }
  render() {
    if (this.type_name == "front_card") {
      this.setState( {
        type_name:"back_card";
      });
      return(<Front_card username_={} position_={} image_src_={}, \>);
    }
    else if (type_name == "back_card") {
      this.setState( {
        type_name: "front_card";
      });
      return(<Back_card command_={} task_={} state_={} script_={}, \>)
    }
  }
}

export default Card;
