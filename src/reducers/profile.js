import _ from  'lodash';
import {GET_USER_PROFILE, UPDATE_USER_PROFILE} from "../actions/types";


const INITIAL_VALUES = {
    items: {},
}


export const profileReducer = (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case GET_USER_PROFILE.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.username] : {...action.payload}}};
        }
        case UPDATE_USER_PROFILE.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.username] : {...action.payload}}};
        }
        default: {
            return state;
        }
    }
}