import {GET_TRANSACTION_PAGE} from "./types";


export const getTransactionPage = ({page, size,sort = 'id',search = ''}) => {
    return {type: GET_TRANSACTION_PAGE.LOAD, payload: {page, size,sort ,search }};
}


export const getTransactionPageSuccess = (transactionPage) => {
    return {type: GET_TRANSACTION_PAGE.SUCCESS, payload:  transactionPage};
}

export const getTransactionPageFailed = (error) => {
    return {type: GET_TRANSACTION_PAGE.FAILED, payload: error};
}