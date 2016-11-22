import * as React from 'react';
import API from './../api';
import {Calendar, Team} from "./../../lib/model";
import { Button, Container, Header, Image, Table} from 'semantic-ui-react'

export default class Calendarlist extends React.Component<{}, {}> {
  ShowRow(calendar:Calendar) {
    let team: Team = API.teams.get(calendar.teamId);
    return (
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src={team.avatar} shape='rounded' size='mini'/>
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
    let calendars = API.calendars.getList();
  	let rows = [];
    for (let calendar of calendars)
      rows.push(this.ShowRow(calendar));
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
