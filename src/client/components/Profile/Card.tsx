import * as React from "react";
import * as ReactDOM from "react-dom";
import API from '../../api';
import {User} from '../../../lib/model';

interface FrontCardProps {
  username: string;
  role: string;
  imageSrc: string;
};

class FrontCard extends React.Component<FrontCardProps, {}> {
  render() {
  return (
      <div className="ui card">

        <div className="blurring dimmable image">
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
              </div>
            </div>
          </div>
          <img src={this.props.imageSrc} alt="Avatar"/>
        </div>

        <div className="content">
          <h4 className="header">{this.props.username}</h4>
          <span className="header">{this.props.role}</span>
        </div>

        <div className="extra content">
          <a>
          </a>
        </div>

      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////

interface BackCardProps {
  team: string;
  position: string;
  place: string;
  description: string;
};

class BackCard extends React.Component<BackCardProps, {}> {
  render() {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">{this.props.team}</div>
          <div className="header">{this.props.position}</div>
          <div className="header">{this.props.place}</div>
          <div className="extra content">
              <div className="description">{this.props.description}</div>
          </div>
        </div>
        <div className="extra content">
        </div>
      </div>
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////

// constants
const FRONT_SIDE = "front_side";
const BACK_SIDE = "back_side";

interface CardProps {
  username: string;
  role: string;
  imageSrc: string;
  team: string;
  position: string;
  place: string;
  description: string;
};

///////////////////////////////////////////////////////////////////////////////////////
interface ICardState {
    user?: User;
};

const otherImg = "http://i1.kym-cdn.com/entries/icons/original/000/004/349/Minecraft_Creeper_Wallpaper_by_LynchMob10_09_1_.jpg";

export class Card extends React.Component<{}, ICardState> {
  constructor() {
      super();
      this.state = {user: null};
  }

  componentDidMount() {
      API.me().then(user => {
          this.setState({user: user });
        });
  }

  render() {
    const {user} = this.state;
    if (!user) return null;

    return (
          <div className="ui card">

            <div className="blurring dimmable image">
              <div className="ui dimmer">
                <div className="content">
                  <div className="center">
                  </div>
                </div>
              </div>
              <img src={user.avatar ? user.avatar : otherImg} alt="Avatar"/>
            </div>

            <div className="content">
              <a className="header">{user.name}</a>
              <div className="meta">
                <span><h5 className="date">{user.role} </h5></span>
              </div>
            </div>
            <div className="content">
              <span className="header">{"Your team"}</span>
              <span className="header">{user.place}</span>
              <span className="header">{user.position}</span>
            </div>
            <div className="content">
              <div className="description">{"Description"}</div>
            </div>
            <div className="extra content">
              <a>
              </a>
            </div>

          </div>
      );
    }
}
