import _ from 'lodash';
import {
    GET_PROFILE_PHOTO,
    GET_PROFILE,
    UPDATE_PROFILE
} from "../actions/types";


const INITIAL_VALUES = {
    info: {},
}


export const profileReducer = (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case GET_PROFILE.SUCCESS: {
            const profile =  action.payload.photo ? action.payload : _.omit(action.payload, 'photo');
            return {...state, info: {...state.info,...profile}};
        }
        case UPDATE_PROFILE.SUCCESS: {
            const profile =  action.payload.photo ? action.payload : _.omit(action.payload, 'photo');
            return {...state, info: {...state.info,...profile}};
        }
        case GET_PROFILE_PHOTO.SUCCESS: {
            return {...state, info: {...state.info, photo: action.payload}};
        }
        default: {
            return state;
        }
    }
}