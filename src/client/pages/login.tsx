import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/login';

interface LoginState {
    username?: string;
    password?: string;
    error?: string;
}

interface LoginDispatch {
    loginRequest(username: string, password: string);
    changeUsername(e: string);
    changePassword(e: string);
}

function mapStateToProps (state) {
  console.log(state);
  return {
      username: state.login.username,
      password: state.login.password,
      error: state.login.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginRequest: bindActionCreators(Actions.loginRequest, dispatch),
    changeUsername: bindActionCreators(Actions.changeUsername, dispatch),
    changePassword: bindActionCreators(Actions.changePassword, dispatch)
  };
}

type LoginProps = LoginState & LoginDispatch;

@connect<LoginProps>(mapStateToProps, mapDispatchToProps)
export default class LoginPage extends React.Component<LoginProps, any> {
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
                                        value={this.props.username}
                                        onChange={this.handleUserNameChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" placeholder="Password"
                                        value={this.props.password}
                                        onChange={this.handlePasswordChange.bind(this)}
                                    />
                                </div>
                            </div>
                            {this.props.error ? <p style={{color: 'red'}}>Invalid username or password</p> : null}
                            <button type="submit" className="ui fluid large teal submit button">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
  }

  handleUserNameChange(e: any) {
    this.props.changeUsername(e.target.value);
  }

  handlePasswordChange(e: any) {
   this.props.changePassword(e.target.value);
  }

  handleSubmit(e: Event) {
      e.preventDefault();
      const {username, password, error} = this.props;
      this.props.loginRequest(username, password);

  }
}
