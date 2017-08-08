import * as _ from 'lodash';
import * as React from "react";

interface ListItemProps {
  teamId: string;
  teamName: string;
  imageSrc: string;
}

class TeamItem extends React.Component<ListItemProps, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <li className="content">
        <div >
          <span>
            <img className="ui avatar image" src={this.props.imageSrc} alt="Avatar"/>
            <a>{this.props.teamName}</a>
          </span>
        </div>
      </li>
    );
  }
}

export interface TeamListProps {
  data: ListItemProps[];
}

export class TeamList extends React.Component<TeamListProps, {}> {
  renderItems() {
      return _.map(this.props.data, (item, i) => (
        <TeamItem key={i} teamId={item.teamId} teamName={item.teamName} imageSrc={item.imageSrc} />
      ));
  }

  render() {
    return(
      <div className="ui card">
        <ul style={{type:'none'}}>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}
