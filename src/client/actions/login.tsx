import { createActions } from 'redux-actions';
import { User } from './../../lib/model';

export const {loginRequest, changeUsername, changePassword, loginError, loginSuccess} = createActions({
  LOGIN_REQUEST: (username: string, password: string) => ({username, password}),
  CHANGE_USERNAME: (username: string) => ({username}),
  CHANGE_PASSWORD: (password: string) => ({password}),
  LOGIN_ERROR: (error: string) => ({error}),
  LOGIN_SUCCESS: (user: User) => ({user})
});
