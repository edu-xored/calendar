import * as React from 'react';
import * as _ from 'lodash';
import API from './../api';
import { Calendar, Team } from "./../../lib/model";
import { Button, Container, Header, Image, Table } from 'semantic-ui-react';

interface CalendarListState {
  calendars: Calendar[];
  teams: Team[];
}

export default class CalendarList extends React.Component<{}, {}> {
  state: CalendarListState = {
    calendars: [],
    teams: [],
  };

  componentDidMount() {
    API.teams.getList().then((teams) => {
      this.setState({
        teams: teams,
      });
    });
    API.calendars.getList().then((calendars) => {
      this.setState({
        calendars: calendars,
      });
    });
  }

  findTeam = (id: string) => {
    return (_.find(this.state.teams, t => t.id === id));
  }

  showRow(calendar: Calendar) {
    let team: Team = this.findTeam(calendar.teamId);
    if (team === null)
      return;
    return (
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src={team.avatar} shape='rounded' size='mini' />
            <Header.Content>
              {calendar.name}
              <div className="sub header">{team.name}</div>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>
          {calendar.description}
        </Table.Cell>
        <Table.Cell textAlign='right'>
          <Button.Group>
            <Button color='blue'>View</Button>
            <Button color='green'>Edit</Button>
            <Button color='red'>Delete</Button>
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
  render() {
    let rows = [];
    for (let calendar of this.state.calendars)
      rows.push(this.showRow(calendar));
    return (
      <Container>
        <Table basic='very' celled>
          <Table.Header fullWidth={true}>
            <Table.Row>
              <Table.HeaderCell>Calendar</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rows}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}
