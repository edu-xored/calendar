import * as React from "react";
import * as ReactDOM from "react-dom";


interface ListItemProps {
  teamId: string;
  teamName: string;
  imageSrc: string;
};


class TeamItem extends React.Component<ListItemProps, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const teamId = this.props.teamId;
    // console.log(teamId);
    // console.log(this.props);
    return (
      <li id={teamId.toString()} className="content">
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
};

export class TeamList extends React.Component<TeamListProps, {}> {
  constructor(props: TeamListProps) {
    super(props);
  }

  getListItem() {
    console.log(this.props);
      const items = this.props.data;
      const listItem = items.map((item) =>
        <TeamItem teamId={item.teamId} teamName={item.teamName} imageSrc={item.imageSrc} />
      );
      console.log(listItem);
      return listItem;
  }

  render() {
    return(
      <div className="ui card">
        <ul type = "none">
          {this.getListItem()}
        </ul>
      </div>
    );
  }
}
