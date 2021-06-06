import {LOADING, SHOW_ERROR_MESSAGE, SHOW_MODAL_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from "../actions/types";


const INITIAL_VALUES = {
    success : {},
    error: {},
    modalError: {},
    isLoading: false,
}



export const appMessageReducer = (state = INITIAL_VALUES , action) => {
    switch (action.type) {
        case SHOW_SUCCESS_MESSAGE: {
            return  {...state, success: {...action.payload}};
        }
        case SHOW_ERROR_MESSAGE: {
            return  {...state, error: {...action.payload}};
        }
        case SHOW_MODAL_ERROR_MESSAGE: {
            return  {...state ,  modalError: {...action.payload}};
        }
        case LOADING.START:
            return  {...state, isLoading: true};
        case LOADING.STOP: {
            return  {...state, isLoading: false};
        }
        default: {
            return state;
        }
    }
}