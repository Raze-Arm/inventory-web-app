import {GET_USER_PROFILE, UPDATE_USER_PROFILE} from "./types";


export const getUserProfile = (username) => {
    return {type: GET_USER_PROFILE.LOAD, payload: username};
}

export const getUserProfileSuccess = (profile) => {
    return {type: GET_USER_PROFILE.SUCCESS, payload: profile};
}
export const getUserProfileFailed = (error) => {
    return {type: GET_USER_PROFILE.FAILED, payload: error};
}


export const updateUserProfile = (profile) => {
    return {type: UPDATE_USER_PROFILE.LOAD, payload: profile};
}

export const updateUserProfileSuccess = (profile) => {
    return {type: UPDATE_USER_PROFILE.SUCCESS, payload: profile};
}

export const updateUserProfileFailed = (error) => {
    return {type: UPDATE_USER_PROFILE.FAILED, payload: error};
}