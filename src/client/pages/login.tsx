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
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <form className="ui large form" style={formStyle} onSubmit={this.handleSubmit.bind(this)}>
                        <h2 className="ui teal image header">
                            <img src="/public/img/pictureCalendearForLoginPage.png" className="image"></img>
                            <div className="content">Log-in to your account</div>
                        </h2>
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" placeholder="Login"
                                        value={this.state.userName}
                                        onChange={this.handleUserNameChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" placeholder="Password" value={this.state.password}
                                        onChange={this.handlePasswordChange.bind(this)}/>
                                </div>
                            </div>
                            {this.state.error ? <p style={{color :'red'}}>Invalid username or password</p> : null}
                            <button type="submit" className="ui fluid large teal submit button">Login</button>
                        </div>
                    </form>
                </div>
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
