import {LOADING, SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from "./types";

export const showSuccessMessage = ({title, content}) => {
    return {type: SHOW_SUCCESS_MESSAGE, payload: {title, content}};
}

export const showErrorMessage = ({title, content}) => {
    return {type: SHOW_ERROR_MESSAGE, payload: {title, content}};
}


export const showLoadingScreen = () => {
    return {type: LOADING.START};
}

export const stopLoadingScreen = () => {
    return {type: LOADING.STOP};
}