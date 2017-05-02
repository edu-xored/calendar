import { createActions } from 'redux-actions'



export const {loginRequest, changeUsername, changePassword, loginError} = createActions({
    LOGIN_REQUEST: (username:string, password:string) => ({username, password}),
    CHANGE_USERNAME: (username:string) => ({username}),
    CHANGE_PASSWORD: (password:string) => ({password}),
    LOGIN_ERROR: (error:string) => ({error})
});