import {call, put, take} from 'redux-saga/effects'

import API from '../api';
import history from '../history';

import {store} from '../index'

import *as Actions from '../actions/login'

export function* loginFlow() {
    while(true) {
        try {
            const {userName, password} = yield take('LOGIN_REQUEST');
            //console.log(userName, password);
            const token = yield call(API.login, userName, password);
            //console.log(token);
            yield put({type: "LOGIN_SUCCESS", token});
            localStorage.setItem('access_token', token);
            history.push('/');
        } catch(error) {
            yield put(Actions.actionLoginError("invalid credentials"));
        }
    }
}