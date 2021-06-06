import {GET_PURCHASE_TRANSACTION_PAGE, GET_SALE_TRANSACTION_PAGE, GET_TRANSACTION_PAGE} from "./types";


export const getTransactionPage = ({page, size,sort = 'id',search = ''}) => {
    return {type: GET_TRANSACTION_PAGE.LOAD, payload: {page, size,sort ,search }};
}


export const getTransactionPageSuccess = (transactionPage) => {
    return {type: GET_TRANSACTION_PAGE.SUCCESS, payload:  transactionPage};
}

export const getTransactionPageFailed = (error) => {
    return {type: GET_TRANSACTION_PAGE.FAILED, payload: error};
}

export const getSaleTrPage = ({page, size,sort = 'id',search = ''}) => {
    return {type: GET_SALE_TRANSACTION_PAGE.LOAD, payload: {page, size,sort ,search } };
}
export const getSaleTrPageSuccess = (transactionPage) => {
    return {type: GET_SALE_TRANSACTION_PAGE.SUCCESS, payload: transactionPage };
}
export const getSaleTrPageFailed = (error) => {
    return {type: GET_SALE_TRANSACTION_PAGE.FAILED, payload: error};
}


export const getPurchaseTrPage = ({page, size,sort = 'id',search = ''}) => {
    return {type: GET_PURCHASE_TRANSACTION_PAGE.LOAD, payload:  {page, size,sort ,search }};
}
export const getPurchaseTrPageSuccess = (transactionPage) => {
    return {type: GET_PURCHASE_TRANSACTION_PAGE.SUCCESS, payload: transactionPage };
}
export const getPurchaseTrPageFailed = (error) => {
    return {type: GET_PURCHASE_TRANSACTION_PAGE.FAILED, payload: error};
}