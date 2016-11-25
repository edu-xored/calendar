import * as React from 'react';
import { Container, Button, Checkbox, Form } from 'semantic-ui-react'


export default class LoginMobile extends React.Component<{}, {}> {

  render() {
    return (
      <Container>
      <Form>
        <Form.Field>
          <label>Login</label>
            <input placeholder='Login' />
        </Form.Field>
        <Form.Field>
            <label>Password</label>
              <input type='password' placeholder='Password' />
        </Form.Field>
        <Form.Field>
             <Checkbox label='Remind me' />
        </Form.Field>
      <Button type='submit'>Login</Button>
      </Form>
      </Container>
    );
  }
}
