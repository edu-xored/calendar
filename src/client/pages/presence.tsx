import * as React from 'react';
import {Image, Header, Container, Form, Button, Radio} from 'semantic-ui-react';

export default class PresencePage extends React.Component<{}, {}> {
  render() {
    return (
      <Container>
        <h3>Today are absent:</h3>
        <Header as='h4' image>
          <Image src='http://semantic-ui.com/images/avatar2/small/lena.png' shape='rounded' size='mini'/>
          <Header.Content>
            Lena
            <div className="sub header">Human Resources</div>
          </Header.Content>
        </Header>
        <Header as='h4' image>
          <Image src='http://semantic-ui.com/images/avatar2/small/matthew.png' shape='rounded' size='mini'/>
          <Header.Content>
            Matthew
            <div className="sub header">Human Resources</div>
          </Header.Content>
        </Header>
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
