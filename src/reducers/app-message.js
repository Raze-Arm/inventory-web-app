import {SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from "../actions/types";


const INITIAL_VALUES = {
    success : {},
    error: {}
}



export const appMessageReducer = (state = INITIAL_VALUES , action) => {
    switch (action.type) {
        case SHOW_SUCCESS_MESSAGE: {
            return  {...state, success: {...action.payload}};
        }
        case SHOW_ERROR_MESSAGE: {
            return  {...state, error: {...action.payload}};
        }
        default: {
            return state;
        }
    }
}