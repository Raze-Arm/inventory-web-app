import _ from  'lodash';
import {GET_ACTIVITY_PAGE, GET_ACTIVITY_PAGE_BY_USERNAME, GET_USER_ACTIVITY_PAGE} from "../actions/types";



const INITIAL_VALUES = {
    items: {} ,
    totalPages: 0,
    totalElements: 0
}


export const activityReducer = (state = INITIAL_VALUES,  action ) => {
    switch (action.type) {
        case GET_USER_ACTIVITY_PAGE.SUCCESS: {
            const data = action.payload;
            return {...state,items: {...state.items ,..._.mapKeys(data.content, 'createdDate')} ,   totalPages: data.totalPages, totalElements: data.totalElements};

        }
        case GET_ACTIVITY_PAGE.SUCCESS: {
            const data = action.payload;
            return {...state,items: {...state.items ,..._.mapKeys(data.content, 'createdDate')} ,   totalPages: data.totalPages, totalElements: data.totalElements};

        }

        case GET_ACTIVITY_PAGE_BY_USERNAME.SUCCESS: {
            const data = action.payload;
            return {...state,items: {...state.items ,..._.mapKeys(data.content, 'createdDate')} ,   totalPages: data.totalPages, totalElements: data.totalElements};

        }

        default: {
            return state;
        }
    }
}