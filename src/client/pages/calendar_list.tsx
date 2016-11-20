import * as React from 'react';
import {Calendar, Team} from "./../../lib/model";
import { Button, Container, Header, Image, Table} from 'semantic-ui-react'

export default class Calendarlist extends React.Component<{}, {}> {
  team: Team = {
    id: "1",
    name: "Developers",
    avatar: "http://semantic-ui.com/images/avatar2/small/lena.png",
    description: "Lorem ipsum",
    members: [],
  };
  calendars: Calendar[] = [
    {
      id: "1",
      name: 'Calendar',
      type: 'default',
      description: "Lorem ipsum",
      teamId: "1",
      events: [],
    },
    {
      id: "1",
      name: 'Calendar',
      type: 'default',
      description: "Lorem ipsum",
      teamId: "1",
      events: [],
    },
    {
      id: "1",
      name: 'Calendar',
      type: 'default',
      description: "Lorem ipsum",
      teamId: "1",
      events: [],
    },
    {
      id: "1",
      name: 'Calendar',
      type: 'default',
      description: "Lorem ipsum",
      teamId: "1",
      events: [],
    },
  ];
  ShowRow(calendar:Calendar) {
    return (
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src={this.team.avatar} shape='rounded' size='mini'/>
                  <Header.Content>
                    {calendar.name}
                    <div className="sub header">{this.team.name}</div>
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
    for (let calendar of this.calendars)
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