import _ from  'lodash';
import {
    DELETE_SUPPLIER,
    GET_SUPPLIER,
    GET_SUPPLIER_LIST,
    GET_SUPPLIER_PAGE,
    SAVE_SUPPLIER,
    UPDATE_SUPPLIER
} from "../actions/types";

const INITIAL_VALUES = {
    items: {},
    totalPages: 0,
    totalElements: 0,
}


export const supplierReducer = (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case GET_SUPPLIER_PAGE.SUCCESS: {
            const data = action.payload;
                return {...state,items: {...state.items ,..._.mapKeys(data.content, 'id')},  totalPages: data.totalPages, totalElements: data.totalElements};
        }
        case GET_SUPPLIER_LIST.SUCCESS: {
            const data = action.payload;
            return {...state , items: {..._.mapKeys(data, 'id')}};
        }
        case GET_SUPPLIER.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case SAVE_SUPPLIER.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case UPDATE_SUPPLIER.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case DELETE_SUPPLIER.SUCCESS: {
            return {...state, items: {..._.omit(state.items, action.payload)}};
        }
        default: {
            return state;
        }
    }
}
