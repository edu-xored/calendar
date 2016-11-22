import * as React from 'react';
import API from './../api';
import {Event, User, Team} from "./../../lib/model";
import {Image, Header, Container, Form, Button, Radio} from 'semantic-ui-react';
import {start} from "repl";

export default class PresencePage extends React.Component<{}, {}> {
  ShowAbsent(event: Event) {
    let user: User = API.users.get(event.userId);
    return (
      <Header as='h4' image>
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
    let events: Event[] = API.events.getList();
    let now = new Date();
    for (let event of events) {
      if (event.allDay && event.start.getDate() === now.getDate()
        && event.start.getMonth() === now.getMonth()
        && event.start.getFullYear() === now.getFullYear()
        && event.type === 'PTO' && event.type === 'Absent' && event.type === 'WFH')
      absentUsers.push(this.ShowAbsent(event));
    }
    return (
      <Container>
        <h3>Today are absent:</h3>
        {absentUsers}
        <h3>Submit your status</h3>
        <Form>
          <Form.Field>
            <label>Status</label>
            <Form.Group inline>
              <Form.Radio label='Absent' name='plan' value='a' />
              <Form.Radio label='PTO' name='plan' value='b' />
              <Form.Radio label='WFH' name='plan' value='c' />
              <Form.Radio label='Working' name='plan' value='d' />
            </Form.Group>
          </Form.Field>
          <Form.TextArea name='details' label='Details' placeholder='Wot are you doing?' rows='3' />
          <Button primary type='submit'>Submit</Button>
        </Form>
      </Container>
    );
  }
}
