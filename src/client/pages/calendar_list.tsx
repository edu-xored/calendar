import * as React from 'react';
import * as _ from 'lodash';
import API from './../api';
import {Calendar, Team} from "./../../lib/model";
import {Form, Input, Icon, Modal, Button, Container, Header, Image, Table} from 'semantic-ui-react';
import history from '../history';

interface CalendarListState {
  calendars: Calendar[];
  teams: Team[];
  delModalOpened: string;
  editModalOpened: string;
  editCalendarName: string;
  editCalendarDesc: string;
  editCalendarTeam: string;
}

export default class CalendarList extends React.Component<{}, {}> {
  state: CalendarListState = {
    calendars: [],
    teams: [],
    delModalOpened: "null",
    editModalOpened: "null",
    editCalendarName: '',
    editCalendarDesc: '',
    editCalendarTeam: '',
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
    const handleModalOpened = (e) => {
      this.setState({
        delModalOpened: calendar.id,
      });
    };
    const handleModalClosed = (e) => {
      this.setState({
        delModalOpened: "null",
      });
    };
    const handleEditModalOpened = (e) => {
      this.setState({
        editModalOpened: calendar.id,
        editCalendarName: calendar.name,
        editCalendarDesc: calendar.description,
        editCalendarTeam: calendar.teamId,
      });
    };
    const handleEditModalClosed = (e) => {
      this.setState({
        editModalOpened: "null",
      });
    };
    const onRemove = () => {
      API.calendars.remove(calendar.id);
    };
    const onEdit = (e, data) => {
      API.calendars.update(calendar.id, {
        name: this.state.editCalendarName,
        description: this.state.editCalendarDesc,
        teamId: this.state.editCalendarTeam,
      });
    };
    let teams = [];
    for (let team of this.state.teams)
      teams.push({text: team.name, value: team.id});
    const view = () => {
      history.push(`/calendar/${calendar.id}`);
    };
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
            <Button color='blue' onClick={view}>View</Button>
            <Modal trigger={<Button color='green' onClick={handleEditModalOpened}>Edit</Button>}
                   open={this.state.editModalOpened === calendar.id} onClose={handleEditModalClosed}>
              <Header icon='edit' content='Edit calendar'/>
              <Modal.Content>
                <Form onSubmit={onEdit}>
                  <Form.Input label='Name' name='name' placeholder='Name' value={this.state.editCalendarName}
                              onChange={(e) => {this.setState({editCalendarName: e.target.value,});}}/>
                  <Form.Input name='description' label='Description' placeholder='Put a description'
                              value={this.state.editCalendarDesc}
                              onChange={(e) => {this.setState({editCalendarDesc: e.target.value,});}}/>
                  <Form.Select name='team' label="Team" options={teams} placeholder='Team'
                               value={this.state.editCalendarTeam}
                               onChange={(e) => {this.setState({editCalendarTeam: e.target.value,});}}/>
                  <Button color='green' type='submit' fluid>
                    <Icon name='checkmark'/> Update
                  </Button>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button basic color='red' onClick={handleEditModalClosed}>
                  <Icon name='remove'/> Close
                </Button>
              </Modal.Actions>
            </Modal>
            <Modal trigger={<Button color='red' onClick={handleModalOpened}>Delete</Button>}
                   open={this.state.delModalOpened === calendar.id} onClose={handleModalClosed} basic size='small'>
              <Header icon='remove' content='Delete calendar'/>
              <Modal.Content>
                <p>Do you really want to delete calendar "{calendar.name}"?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button basic color='red' inverted onClick={handleModalClosed}>
                  <Icon name='remove'/> No
                </Button>
                <Button color='green' inverted onClick={onRemove}>
                  <Icon name='checkmark'/> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    let teams = [];
    for (let team of this.state.teams)
      teams.push({text: team.name, value: team.id});
    let rows = [];
    const onCreate = (e, data) => {
      API.calendars.create({
        name: this.state.editCalendarName,
        description: this.state.editCalendarDesc,
        teamId: this.state.editCalendarTeam,
      });
    };
    const handleCreateModalOpened = (e) => {
      this.setState({
        editModalOpened: "new",
        editCalendarName: '',
        editCalendarDesc: '',
        editCalendarTeam: '',
      });
    };
    const handleCreateModalClosed = (e) => {
      this.setState({
        editModalOpened: "null",
      });
    };
    for (let calendar of this.state.calendars)
      rows.push(this.showRow(calendar));
    return (
      <Container className="container-content">
        <Table basic='very' celled>
          <Table.Header fullWidth={true}>
            <Table.Row>
              <Table.HeaderCell>Calendar</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>
                <Modal trigger={<Button color='green' icon="add to calendar" onClick={handleCreateModalOpened} />}
                       open={this.state.editModalOpened === "new"} onClose={handleCreateModalClosed}>
                  <Header icon='edit' content='Create calendar'/>
                  <Modal.Content>
                    <Form onSubmit={onCreate}>
                      <Form.Input label='Name' name='name' placeholder='Name' value={this.state.editCalendarName}
                                  onChange={(e) => {this.setState({editCalendarName: e.target.value,});}}/>
                      <Form.Input name='description' label='Description' placeholder='Put a description'
                                  value={this.state.editCalendarDesc}
                                  onChange={(e) => {this.setState({editCalendarDesc: e.target.value,});}}/>
                      <Form.Select name='team' label="Team" options={teams} placeholder='Team'
                                   value={this.state.editCalendarTeam}
                                   onChange={(e) => {this.setState({editCalendarTeam: e.target.value,});}}/>
                      <Button color='green' type='submit' fluid>
                        <Icon name='checkmark'/> Create
                      </Button>
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic color='red' onClick={handleCreateModalClosed}>
                      <Icon name='remove'/> Close
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Table.HeaderCell>
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
