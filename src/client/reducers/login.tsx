import {handleActions} from 'redux-actions'

import {changePassword, loginError, loginRequest, changeUsername} from '../actions/login'

const defoultState = {
    username: '',
    password: '',
    error: NaN
};

const reducerLogin = handleActions({
    [loginRequest]: (state, action) => ({
        username: action.payload.username,
        password: action.payload.password,
        error: state.error
    }),
    [changePassword]: (state, action) => ({
        username: state.username,
        password: action.payload.password,
        error: state.error
    }),
    [changeUsername]: (state, action) => ({
        username: action.payload.username,
        password: state.password,
        error: state.error
    }),
    [loginError]: (state, action) => ({
        username: state.username,
        password: state.password,
        error: action.payload.error
    })
}, {
    state: defoultState
});

export default reducerLogin;