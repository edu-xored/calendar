import * as React from 'react';
import API from './../api';
import {Event, User, Team} from "./../../lib/model";
import {Image, Header, Container, Form, Button, Radio} from 'semantic-ui-react';
import {start} from "repl";

interface PresenceState {
  events: Event[];
  users: User[];
}

export default class PresencePage extends React.Component<{}, {}> {
  state: PresenceState = {
    events: [],
    users: [],
  }

  componentDidMount() {
    API.users.getList().then((users: User[]) => {
      this.setState({
        users: users,
      })
    });
    API.events.getList().then((events: Event[]) => {
      this.setState({
        events: events,
      })
    });
  }

  FindUser = (id: string) => {
    for (let user of this.state.users)
      if (user.id === id)
        return user;
    return null;
  }

  ShowAbsent(event: Event) {
    let user = this.FindUser(event.userId);
    if (user === null)
      return;
    return (
      <Header as='h4' className="absent-user" image>
        <Image src={user.avatar} shape='rounded' size='mini'/>
        <Header.Content>
          {user.name}
          <div className="sub header">{event.type}</div>
        </Header.Content>
      </Header>
    );
  }
  render() {
    let absentUsers = [];
    let now = new Date(Date.now());
    for (let event of this.state.events) {
      if (event.duration === '1d' && event.start.getDate() === now.getDate()
        && event.start.getMonth() === now.getMonth()
        && event.start.getFullYear() === now.getFullYear()
        && (event.type === '12354' ||event.type === 'PTO' || event.type === 'Absent' || event.type === 'WFH'))
        absentUsers.push(this.ShowAbsent(event));
    }
    return (
      <Container className="container-content">
        <h3>Today are absent:</h3>
        {absentUsers}
        <h3>Submit your status</h3>
        <Form>
          <Form.Field>
            <label>Status</label>
            <Form.Group inline>
              <Form.Radio label='Absent' name='type' value='absent' />
              <Form.Radio label='PTO' name='type' value='pto' />
              <Form.Radio label='WFH' name='type' value='wfh' />
              <Form.Radio label='Working' name='type' value='none' />
            </Form.Group>
          </Form.Field>
          <Form.TextArea name='details' label='Details' placeholder='Wot are you doing?' rows='3' />
          <Button primary type='submit'>Submit</Button>
        </Form>
      </Container>
    );
  }
}
