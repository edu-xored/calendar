import * as React from 'react';
import { Button, Input } from 'semantic-ui-react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { store } from '../index'

import * as Actions from '../actions/login'

interface LoginState {
    userName?: string;
    password?: string;
    error?: string;
}

function mapStateToProps (state) {
    return {
        userName: state.loginState.userName,
        password: state.loginState.password,
        error: state.loginState.error
    }
}

@connect<LoginState>(mapStateToProps)
export default class LoginPage extends React.Component<LoginState, any> {
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
                                        value={this.props.userName}
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
                            {this.props.error ? <p style={{color :'red'}}>Invalid username or password</p> : null}
                            <button type="submit" className="ui fluid large teal submit button">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
  }

  handleUserNameChange(e: any) {
    // this.props.actionInputUserName.bind(e.target.value);
    store.dispatch(Actions.actionInputUserName(e.target.value));
  }

  handlePasswordChange(e: any) {
    // this.props.actionInputPassword.bind(e.target.value);
    store.dispatch(Actions.actionInputPassword(e.target.value));
  }

  handleSubmit(e: Event) {
      e.preventDefault();
      const {userName, password, error} = this.props;
      store.dispatch(Actions.actionLoginRequest({userName, password}));

  }
}
