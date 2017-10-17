import {handleActions} from 'redux-actions';

import {changePassword, loginError, loginRequest, changeUsername, loginSuccess} from '../actions/login';

const defaultState = {
    username: '',
    password: '',
    error: NaN,
    user: NaN
};

const reducerLogin = handleActions({
    [loginRequest]: (state, action) => ({
        username: action.payload.username,
        password: action.payload.password,
        error: state.error,
        user: state.user
    }),
    [changePassword]: (state, action) => ({
        username: state.username,
        password: action.payload.password,
        error: state.error,
        user: state.user
    }),
    [changeUsername]: (state, action) => ({
        username: action.payload.username,
        password: state.password,
        error: state.error,
        user: state.user
    }),
    [loginError]: (state, action) => ({
        username: state.username,
        password: state.password,
        error: action.payload.error,
        user: state.user
    }),
    [loginSuccess]: (state, action) => {
    return ({
        username: state.username,
        password: state.password,
        error: state.error,
        user: action.payload.user
    });}
}, {
    state: defaultState
});

export default reducerLogin;
