import _ from  'lodash';
import {GET_TRANSACTION_PAGE} from "../actions/types";

const INITIAL_VALUES = {
    items: {},
}


export const transactionReducer = (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case  GET_TRANSACTION_PAGE.SUCCESS: {
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
