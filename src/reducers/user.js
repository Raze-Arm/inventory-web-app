import _ from  'lodash';
import {
    DELETE_USER,
    GET_USER,
    GET_USER_BY_USERNAME,
    GET_USER_PAGE,
    SAVE_USER,
    UPDATE_USER
} from "../actions/types";


const INITIAL_VALUES = {
    items: {},
    totalPages: 0,
    totalElements: 0
}


export const userReducer = (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case GET_USER_PAGE.SUCCESS: {
            const data = action.payload;
            return {...state,items: {...state.items ,..._.mapKeys(data.content, 'id')} ,  totalPages: data.totalPages, totalElements: data.totalElements};
        }
        case GET_USER.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}

        }
        case GET_USER_BY_USERNAME.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}};
        }

        case SAVE_USER.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}

        }
        case UPDATE_USER.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case DELETE_USER.SUCCESS: {
            return {...state, items: {..._.omit(state.items, action.payload)}};
        }
        default: {
            return state;
        }
    }
}