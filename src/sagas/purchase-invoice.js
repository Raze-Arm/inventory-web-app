import {takeEvery, call, put} from 'redux-saga/effects';
import {
    DELETE_PURCHASE_INVOICE,
    GET_PURCHASE_INVOICE,
    GET_PURCHASE_INVOICE_LIST,
    SAVE_PURCHASE_INVOICE
} from "../actions/types";
import {deletePInvoice, fetchPInvoice, fetchPInvoiceList, postPInvoice} from "../services/purchase-invoice";
import {
    deletePInvoiceSuccess,
    getPInvoiceListSuccess,
    getPInvoicesSuccess,
    savePInvoiceSuccess
} from "../actions/purchase-invoice";



function* purchaseInvoiceWatcher() {
    yield takeEvery(GET_PURCHASE_INVOICE_LIST.LOAD , getInvoiceListFlow);
    yield takeEvery(GET_PURCHASE_INVOICE.LOAD , getInvoiceFlow);
    yield takeEvery(SAVE_PURCHASE_INVOICE.LOAD , saveInvoiceFlow);
    yield takeEvery(DELETE_PURCHASE_INVOICE.LOAD , deleteInvoiceFlow);

}


function* getInvoiceListFlow(action) {
    try {
        const invoiceList = yield call(fetchPInvoiceList);
        console.log('purchase invoice list', invoiceList);
        yield put(getPInvoiceListSuccess(invoiceList));
    }catch (e) {

    }
}
function* getInvoiceFlow(action) {
    const id = action.payload;
    try {
        const invoice = yield call(fetchPInvoice, id);
        console.log("purchase invoice", invoice);
        yield put(getPInvoicesSuccess(invoice));
    }catch (e) {

    }
}
function* saveInvoiceFlow(action) {
    const invoice = action.payload;
    try {
        const savedInvoice = yield call(postPInvoice, invoice);
        console.log('saved invoice', savedInvoice);
        yield put(savePInvoiceSuccess(savedInvoice));
    }catch (e) {

    }
}
function* deleteInvoiceFlow(action) {
    const id = action.payload;

    try {
        yield call(deletePInvoice, id);
        console.log('deleted purchase invoice', id);
        yield put(deletePInvoiceSuccess(id));
    }catch (e) {

    }
}


export default purchaseInvoiceWatcher();