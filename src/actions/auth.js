import {LOGIN, LOGOUT, RESET_PASSWORD, USER_SECURITY} from "./types";


export const login = ({username, password}) => {
    return {type: LOGIN.LOAD, payload: {username, password}};
}

export const loginSuccess = (userInfo) => {
    return {type: LOGIN.SUCCESS, payload: userInfo };
}

export const loginFailed = (error) => {
    return {type: LOGIN.FAILED, payload: error};
}



export const logout = () => {
    return {type: LOGOUT.LOAD};
}

export const logoutSuccess = () => {
    return {type: LOGOUT.SUCCESS};
}
export const logoutFailed = (error) => {
    return {type: LOGOUT.FAILED, payload: error};
}



export const forgotPasswordRequest = ({username, email}) => {
    return {type: USER_SECURITY.FORGOT, payload: {username, email} };
}

export const resetPasswordRequest = ({username, password, email, token, confirmCode}) => {
    return {type: USER_SECURITY.RESET, payload: {username, password, email, token, confirmCode}};
}