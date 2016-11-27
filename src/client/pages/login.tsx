import * as React from 'react';
import API from '../api';
import history from '../history';

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
                        <input style={inputStyle} name="username" value={this.state.userName}
                               onChange={this.handleUserNameChange.bind(this)}/>
                    </p>
                    <p>
                        <input style={inputStyle} name="password" value={this.state.password}
                               onChange={this.handlePasswordChange.bind(this)}/>
                    </p>
                     {this.state.error ? <p style={{color :'red'}}>Invalid username or password</p> : null}
                    <p><button type="submit">Login</button></p>
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
