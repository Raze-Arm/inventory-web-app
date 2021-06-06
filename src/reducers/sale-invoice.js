import {
    DELETE_SALE_INVOICE,
    GET_SALE_INVOICE,
    GET_SALE_INVOICE_LIST, GET_SALE_INVOICE_PAGE,
    SAVE_SALE_INVOICE
} from "../actions/types";
import _ from "lodash";

const INITIAL_VALUES = {
    items: {},
    totalPages: 0,
    totalElements: 0,
}

export const saleInvoiceReducer = (state  = INITIAL_VALUES,  action) => {
    switch (action.type) {
        case GET_SALE_INVOICE_PAGE.SUCCESS: {
            const data = action.payload;
                return {...state,items: {...state.items ,..._.mapKeys(data.content, 'id')} ,  totalPages: data.totalPages, totalElements: data.totalElements};
        }
        case GET_SALE_INVOICE_LIST.SUCCESS: {
            const data = action.payload;
            return  {...state, items: {..._.mapKeys(data, 'id')}};
        }
        case GET_SALE_INVOICE.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case SAVE_SALE_INVOICE.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case DELETE_SALE_INVOICE.SUCCESS: {
            return {...state, items: {..._.omit(state.items, action.payload)}};
        }
        default: {
            return state;
        }

    }
}