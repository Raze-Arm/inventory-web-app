import _ from  'lodash';
import {
    DELETE_CUSTOMER,
    GET_CUSTOMER,
    GET_CUSTOMER_LIST,
    GET_CUSTOMER_PAGE,
    SAVE_CUSTOMER,
    UPDATE_CUSTOMER
} from "../actions/types";
const INITIAL_VALUES = {
    items: {},
    totalPages: 0,
    totalElements: 0,

}

export const customerReducer = (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case GET_CUSTOMER_PAGE.SUCCESS: {
            const data = action.payload;
                return {...state,items: {...state.items ,..._.mapKeys(data.content, 'id')} ,  totalPages: data.totalPages, totalElements: data.totalElements};
        }
        case GET_CUSTOMER_LIST.SUCCESS: {
            const data = action.payload;
            return {...state , items: {..._.mapKeys(data, 'id')}};
        }
        case GET_CUSTOMER.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case SAVE_CUSTOMER.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case UPDATE_CUSTOMER.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case DELETE_CUSTOMER.SUCCESS: {
            return {...state, items: {..._.omit(state.items, action.payload)}};
        }
        default: {
            return state;
        }
    }
}