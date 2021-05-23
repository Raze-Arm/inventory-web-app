import {takeEvery, call, put} from 'redux-saga/effects';
import {DELETE_SALE_INVOICE, GET_SALE_INVOICE, GET_SALE_INVOICE_LIST, SAVE_SALE_INVOICE} from "../actions/types";
import {
    deleteSInvoiceSuccess,
    getSInvoiceListSuccess,
    getSInvoiceSuccess,
    saveSInvoiceSuccess
} from "../actions/sale-invoice";
import {deleteSInvoice, fetchSInvoice, fetchSInvoiceList, postSInvoice} from "../services/sale-invoice";



function* saleInvoiceWatcher() {
    yield takeEvery(GET_SALE_INVOICE_LIST.LOAD, getInvoiceListFlow);
    yield takeEvery(GET_SALE_INVOICE.LOAD, getInvoiceFlow);
    yield takeEvery(SAVE_SALE_INVOICE.LOAD, saveInvoiceFlow);
    yield takeEvery(DELETE_SALE_INVOICE.LOAD, deleteInvoiceFlow);
}


function* getInvoiceListFlow(action) {
    try {
        const invoiceList = yield call(fetchSInvoiceList);
        console.log('sale invoice list', invoiceList);
        yield put(getSInvoiceListSuccess(invoiceList));
    }catch (e) {

    }
}
function* getInvoiceFlow(action) {
    const id = action.payload;
    try {
        const invoice = yield call(fetchSInvoice, id);
        console.log("sale invoice", invoice);
        yield put(getSInvoiceSuccess(invoice));
    }catch (e) {

    }
}
function* saveInvoiceFlow(action) {
    const invoice = action.payload;
    try {
        const id = yield call(postSInvoice, invoice);
        invoice.id = id;
        console.log('saved sale invoice', invoice);
        yield put(saveSInvoiceSuccess(invoice));
    }catch (e) {

    }
}
function* deleteInvoiceFlow(action) {
    const id = action.payload;

    try {
        yield call(deleteSInvoice, id);
        console.log('deleted sale invoice', id);
        yield put(deleteSInvoiceSuccess(id));
    }catch (e) {

    }
}


export default saleInvoiceWatcher();