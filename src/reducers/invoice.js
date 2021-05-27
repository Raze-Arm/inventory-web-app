import _ from  'lodash';
import {GET_INVOICE_PAGE} from "../actions/types";


const INITIAL_VALUES = {
    items: {}
}



export const invoiceReducer = (state= INITIAL_VALUES, action) => {
    switch (action.type) {
        case GET_INVOICE_PAGE.SUCCESS: {
            const data = action.payload;
            if(_.size(state.items) > 50)
                return {...state,items: {...state.items ,..._.mapKeys(data.content, 'id')}};
            else
                return {...state,items: {..._.mapKeys(data.content, 'id')}};
        }
        default: {
            return state;
        }
    }
}