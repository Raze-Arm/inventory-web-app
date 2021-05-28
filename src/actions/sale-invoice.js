import {DELETE_SALE_INVOICE, GET_SALE_INVOICE, GET_SALE_INVOICE_LIST, SAVE_SALE_INVOICE} from "./types";


export const getSInvoiceList = () => {
    return {type: GET_SALE_INVOICE_LIST.LOAD};
}

export const getSInvoiceListSuccess = (invoiceList) => {
    return {type: GET_SALE_INVOICE_LIST.SUCCESS, payload: invoiceList};
}
export const getSInvoiceListError = (error) => {
    return {type: GET_SALE_INVOICE_LIST.FAILED, payload: error};
}


export const getSInvoice = (id) => {
    return {type: GET_SALE_INVOICE.LOAD, payload: id};
}
export const getSInvoiceSuccess = (invoice) => {
    return {type: GET_SALE_INVOICE.SUCCESS, payload: invoice};
}
export const getSInvoiceFailed = (error) => {
    return {type: GET_SALE_INVOICE.FAILED, payload: error};
}

export const saveSInvoice = (invoice) => {
    return {type: SAVE_SALE_INVOICE.LOAD, payload: invoice};
}
export const saveSInvoiceSuccess = (invoice) => {
    return {type: SAVE_SALE_INVOICE.SUCCESS, payload: invoice};
}
export const saveSInvoiceFailed = (error) => {
    return {type: SAVE_SALE_INVOICE.FAILED, payload: error};
}

export const deleteSInvoice = (id) => {
    return {type: DELETE_SALE_INVOICE.LOAD, payload: id};
}
export const deleteSInvoiceSuccess = (id) => {
    return {type: DELETE_SALE_INVOICE.SUCCESS, payload: id};
}
export const deleteSInvoiceFailed = (error) => {
    return {type: DELETE_SALE_INVOICE.FAILED, payload: error};
}