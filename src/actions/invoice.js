import {GET_INVOICE_PAGE} from "./types";


export const getInvoicePage = ({page, size,sort = 'id',search = ''}) => {
    return {type: GET_INVOICE_PAGE.LOAD, payload: {page, size,sort ,search }};
}

export const getInvoicePageSuccess = (invoicePage) => {
    return {type: GET_INVOICE_PAGE.SUCCESS, payload: invoicePage};
}
export const getInvoicePageFailed = (error) => {
    return {type: GET_INVOICE_PAGE.FAILED, payload: error};
}