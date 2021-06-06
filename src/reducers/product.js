import _ from  'lodash';
import {
    DELETE_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCT_LIST,
    GET_PRODUCT_PAGE,
    SAVE_PRODUCT,
    UPDATE_PRODUCT
} from "../actions/types";
const INITIAL_VALUES = {
    items: {},
    totalPages: 0,
    totalElements: 0,
}


export const productReducer = (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case GET_PRODUCT_PAGE.SUCCESS: {
            const data = action.payload;
                return {...state,items: {...state.items ,..._.mapKeys(data.content, 'id')}, totalPages: data.totalPages, totalElements: data.totalElements };
        }
        case GET_PRODUCT_LIST.SUCCESS: {
            const data = action.payload;
            return {...state , items: {..._.mapKeys(data, 'id')}};
        }
        case GET_PRODUCT.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case SAVE_PRODUCT.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case UPDATE_PRODUCT.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case DELETE_PRODUCT.SUCCESS: {
            return {...state, items: {..._.omit(state.items, action.payload)}};
        }
        default: {
            return state;
        }
    }
}