import {A_LOGIN_ERROR, A_LOGIN_INPUT_PASSWORD, A_LOGIN_INPUT_USERNAME, A_LOGIN_REQUEST} from '../actions/login'

const defoultState = {
    userName: '',
    password: '',
    error: NaN
}

const reducerLogin = (state: any = defoultState , action : any) => {
    switch(action.type) {
        case A_LOGIN_ERROR: {
            let newState = state;
            newState.error = action.error;

            console.log(newState);
    
            return newState;
        }
        case A_LOGIN_INPUT_USERNAME: {
            let newState = state;
            newState.userName = action.userName;

            console.log(newState);

            return newState;
        }
        case A_LOGIN_INPUT_PASSWORD: {
            let newState = state;
            newState.password = action.password;

            console.log(newState);

            return newState;
        }
        case A_LOGIN_REQUEST: {
            let newState = state;

            newState.userName = action.userName;
            newState.password = action.password; 

            console.log(newState);

            return newState;
        }
        default: {
            return state;
        }
    }
}



export default reducerLogin;