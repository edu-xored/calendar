import {call, put, take} from 'redux-saga/effects';

import API from '../api';
import { setToken } from '../api';
import history from '../history';
import * as Actions from '../actions/login';

export function* loginFlow() {
    while (true) {
        try {
            const {payload} = yield take(Actions.loginRequest.toString());
            const token = yield call(API.login, payload.username, payload.password);
            setToken(token);
            const user = yield call(API.me);
            console.log("Login", user);
            yield put(Actions.loginSuccess(user));
            history.push('/');
        } catch (error) {
            yield put(Actions.loginError("invalid credentials"));
        }
    }
}
