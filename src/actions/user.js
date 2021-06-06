import {DELETE_USER, GET_USER, GET_USER_PAGE, GET_USER_PHOTO, SAVE_USER, UPDATE_USER} from "./types";


export const getUserPage = ({page, size,sort = 'id',search = ''}) => {
    return {type: GET_USER_PAGE.LOAD, payload: {page, size, sort, search}};
}

export const getUserPageSuccess = (userPage) => {
    return {type: GET_USER_PAGE.SUCCESS, payload: userPage};
}
export const getUserPageFailed = (error) => {
    return {type: GET_USER_PAGE.FAILED, payload: error};
}

export const getUser = (id) => {
    return {type: GET_USER.LOAD, payload: id};
}
export const getUserSuccess = (user) => {
    return {type: GET_USER.SUCCESS, payload: user};
}
export const getUserFailed = (error) => {
    return {type: GET_USER.FAILED, payload: error};
}

export const saveUser = (user) => {
    return {type: SAVE_USER.LOAD, payload: user};
}
export const saveUserSuccess = (user) => {
    return {type: SAVE_USER.SUCCESS, payload: user};
}
export const saveUserFailed = (error) => {
    return {type: SAVE_USER.FAILED, payload: error};
}

export const updateUser = (user) => {
    return {type: UPDATE_USER.LOAD, payload: user};
}
export const updateUserSuccess = (user) => {
    return {type: UPDATE_USER.SUCCESS, payload: user};
}
export const updateUserFailed = (error) => {
    return {type: UPDATE_USER.FAILED, payload: error};
}

export const getUserPhoto = (id) => {
    return {type: GET_USER_PHOTO.LOAD, payload: id};
}
export const getUserPhotoSuccess = ({id, photo}) => {
    return {type: GET_USER_PHOTO.SUCCESS, payload: {id, photo}};
}

export const getUserPhotoFailed = (error) => {
    return {type: GET_USER_PHOTO.FAILED, payload: error};
}


export const deleteUser = (id) => {
    return {type: DELETE_USER.LOAD, payload: id};
}
export const deleteUserSuccess = (id) => {
    return {type: DELETE_USER.SUCCESS, payload: id};
}

export const deleteUserFailed = (error) => {
    return {type: DELETE_USER.FAILED, payload: error};
}