import _ from  'lodash';
import {GET_INVOICE_PAGE} from "../actions/types";


const INITIAL_VALUES = {
    items: {},
    totalPages: 0,
    totalElements: 0,
}



export const invoiceReducer = (state= INITIAL_VALUES, action) => {
    switch (action.type) {
        case GET_INVOICE_PAGE.SUCCESS: {
            const data = action.payload;
                return {...state,items: {...state.items ,..._.mapKeys(data.content, 'id')}, totalPages: data.totalPages , totalElements: data.totalElements};
        }
        default: {
            return state;
        }
    }
}