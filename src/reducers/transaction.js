import _ from  'lodash';
import {GET_PURCHASE_TRANSACTION_PAGE, GET_SALE_TRANSACTION_PAGE, GET_TRANSACTION_PAGE} from "../actions/types";

const INITIAL_VALUES = {
    items: {},
    totalPages: 0,
    totalElements: 0,
    sale: {
        items: {},
        totalPages: 0,
        totalElements: 0,

    },
    purchase: {
        items: {},
        totalPages: 0,
        totalElements: 0,

    }
}


export const transactionReducer = (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case  GET_TRANSACTION_PAGE.SUCCESS: {
            const data = action.payload;
                return {...state,items: {...state.items ,..._.mapKeys(data.content, 'id')},  totalPages: data.totalPages, totalElements: data.totalElements};
        }
        case GET_SALE_TRANSACTION_PAGE.SUCCESS: {
            const data = action.payload;
            return  {...state, sale: {items: {..._.mapKeys(data.content, 'id')}, totalPages: data.totalPages, totalElements: data.totalElements},};
        }
        case GET_PURCHASE_TRANSACTION_PAGE.SUCCESS: {
            const data = action.payload;
            return  {...state, purchase: {items: {..._.mapKeys(data.content, 'id')}, totalPages: data.totalPages, totalElements: data.totalElements}};
        }
        default: {
            return state;
        }
    }
}
