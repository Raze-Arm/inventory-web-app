import _ from  'lodash';
import {
    DELETE_PURCHASE_INVOICE,
    GET_PURCHASE_INVOICE,
    GET_PURCHASE_INVOICE_LIST, GET_PURCHASE_INVOICE_PAGE,
    SAVE_PURCHASE_INVOICE
} from "../actions/types";

const INITIAL_VALUES = {
    items: {},
    totalPages: 0,
    totalElements: 0,
}


export const purchaseInvoiceReducer = (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case GET_PURCHASE_INVOICE_PAGE.SUCCESS: {
            const data = action.payload;
                return {...state,items: {...state.items ,..._.mapKeys(data.content, 'id')} ,  totalPages: data.totalPages, totalElements: data.totalElements};
        }
        case GET_PURCHASE_INVOICE_LIST.SUCCESS: {
            const data = action.payload;
            return {...state , items: {..._.mapKeys(data, 'id')}};
        }
        case GET_PURCHASE_INVOICE.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case SAVE_PURCHASE_INVOICE.SUCCESS: {
            return {...state, items: {...state.items, [action.payload.id] : {...action.payload}}}
        }
        case DELETE_PURCHASE_INVOICE.SUCCESS: {
            return {...state, items: {..._.omit(state.items, action.payload)}};
        }
        default: {
            return  state;
        }

    }
}
