export const A_LOGIN_REQUEST = "LOGIN_REQUEST";
export const A_LOGIN_INPUT_USERNAME = "LOGIN_INPUT_USERNAME";
export const A_LOGIN_INPUT_PASSWORD = "LOGIN_INPUT_PASSWORD";
export const A_LOGIN_ERROR = 'LOGIN_ERROR';

export const actionLoginRequest = (e:any) => {
    return {
        type: A_LOGIN_REQUEST,
        userName: e.userName,
        password: e.password,
    }
}

export const actionInputUserName = (e: string) => {
    return {
        type: A_LOGIN_INPUT_USERNAME,
        userName: e
    }
}

export const actionInputPassword = (e: string) => {
    return {
        type: A_LOGIN_INPUT_PASSWORD,
        password: e
    }
}

export const actionLoginError = (massage: string) => {
    return {
        type: A_LOGIN_ERROR,
        error: massage
    }
}