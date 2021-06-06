import {GET_PROFILE_PHOTO, GET_PROFILE, UPDATE_PROFILE} from "./types";





export const getProfile = (username) => {
    return {type: GET_PROFILE.LOAD, payload: username};
}

export const getProfileSuccess = (profile) => {
    return {type: GET_PROFILE.SUCCESS, payload: profile};
}
export const getProfileFailed = (error) => {
    return {type: GET_PROFILE.FAILED, payload: error};
}



export const updateProfile = (profile) => {
    return {type: UPDATE_PROFILE.LOAD, payload: profile};
}

export const updateProfileSuccess = (profile) => {
    return {type: UPDATE_PROFILE.SUCCESS, payload: profile};
}

export const updateProfileFailed = (error) => {
    return {type: UPDATE_PROFILE.FAILED, payload: error};
}


export const getProfilePhoto = (username) => {
    return {type: GET_PROFILE_PHOTO.LOAD, payload: username};
}

export const getProfilePhotoSuccess = (photo) => {
    return {type: GET_PROFILE_PHOTO.SUCCESS, payload: photo};
}

export const getProfilePhotoError = (error) => {
    return {type: GET_PROFILE_PHOTO.FAILED, payload: error};
}
