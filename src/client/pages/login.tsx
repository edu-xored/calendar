import * as React from 'react';
import API from '../api';
import history from '../history';
import { Button, Input } from 'semantic-ui-react';

interface LoginState {
    userName?: string;
    password?: string;
    error?: string;
}

export default class LoginPage extends React.Component<{}, LoginState> {
    state: LoginState = {};
    render() {
        const formStyle = {width: '300px', margin: '50px auto'};
        const inputStyle = {width: '300px'};
        return (
            <div>
                <form style={formStyle} onSubmit={this.handleSubmit.bind(this)}>
                    <p>WELCOME</p>
                    <p>
                        <Input type="text" value={this.state.userName} required
                               onChange={this.handleUserNameChange.bind(this)}/>
                    </p>
                    <p>
                        <Input type="password" value={this.state.password} required
                               onChange={this.handlePasswordChange.bind(this)}/>
                    </p>
                     {this.state.error ? <p style={{color :'red'}}>Invalid username or password</p> : null}
                    <p><Button type="submit" primary>Login</Button></p>
                </form>
            </div>
        );
  }

  handleUserNameChange(e: any) {
      this.setState({userName: e.target.value});
  }

  handlePasswordChange(e: any) {
      this.setState({password: e.target.value});
  }

  handleSubmit(e: Event) {
      e.preventDefault();

      API.login(this.state.userName, this.state.password).then(() => {
          history.push('/');
        }, () => {
            this.setState({error: 'invalid credentials'});
        });
  }
}
