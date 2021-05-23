import {DELETE_PURCHASE_INVOICE, GET_PURCHASE_INVOICE, GET_PURCHASE_INVOICE_LIST, SAVE_PURCHASE_INVOICE} from "./types";


export const getPInvoiceList = () => {
    return {type: GET_PURCHASE_INVOICE_LIST.LOAD};
}
export const getPInvoiceListSuccess = (invoiceList) => {
    return {type: GET_PURCHASE_INVOICE_LIST.SUCCESS, payload: invoiceList};
}
export const getPInvoiceListFailed = (error) => {
    return {type: GET_PURCHASE_INVOICE_LIST.FAILED, payload: error};
}


export const getPInvoice = (id) => {
    return {type: GET_PURCHASE_INVOICE.LOAD, payload: id};
}
export const getPInvoicesSuccess = (invoice) => {
    return {type: GET_PURCHASE_INVOICE.SUCCESS, payload: invoice };
}
export const getPInvoiceFailed = (error) => {
    return {type: GET_PURCHASE_INVOICE.FAILED, payload: error};
}

export const savePInvoice = (invoice) => {
    return {type: SAVE_PURCHASE_INVOICE.LOAD, payload: invoice};
}
export const savePInvoiceSuccess = (id) => {
    return {type: SAVE_PURCHASE_INVOICE.SUCCESS, payload:id };
}
export const savePInvoiceFailed = (error) => {
    return {type: SAVE_PURCHASE_INVOICE.FAILED, payload: error};
}


export const deletePInvoice = (id) => {
    return {type: DELETE_PURCHASE_INVOICE.LOAD, payload: id};
}
export const deletePInvoiceSuccess = (id) => {
    return {type: DELETE_PURCHASE_INVOICE.SUCCESS, payload: id};
}
export const deletePInvoiceFailed = (error) => {
    return {type: DELETE_PURCHASE_INVOICE.FAILED, payload: error};
}