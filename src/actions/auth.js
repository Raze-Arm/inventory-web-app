import {LOGIN, LOGOUT} from "./types";


export const login = ({username, password}) => {
    return {type: LOGIN.LOAD, payload: {username, password}};
}

export const loginSuccess = (token) => {
    return {type: LOGIN.SUCCESS, payload: token };
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