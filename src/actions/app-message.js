import {LOADING, SHOW_ERROR_MESSAGE, MODAL_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from "./types";

export const showSuccessMessage = ({title, content}) => {
    return {type: SHOW_SUCCESS_MESSAGE, payload: {title, content}};
}

export const showErrorMessage = ({title, content}) => {
    return {type: SHOW_ERROR_MESSAGE, payload: {title, content}};
}

export const showModalErrorMessage = ({title, content, details}) => {
    return {type: MODAL_ERROR_MESSAGE.SHOW, payload: {title, content, details} };
}

export const closeModalErrorMessage = () => {
    return {type: MODAL_ERROR_MESSAGE.CLOSE};
}


export const showLoadingScreen = () => {
    return {type: LOADING.START};
}

export const stopLoadingScreen = () => {
    return {type: LOADING.STOP};
}