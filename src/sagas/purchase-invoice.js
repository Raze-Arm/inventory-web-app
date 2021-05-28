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
import {showErrorMessage, showSuccessMessage} from "../actions/app-message";



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
        console.log('error', e);
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to show invoice'}));
    }
}
function* saveInvoiceFlow(action) {
    const invoice = action.payload;
    try {
        const id = yield call(postPInvoice, invoice);
        invoice.id = id;
        console.log('saved invoice', invoice);
        yield put(savePInvoiceSuccess(invoice));
        yield put(showSuccessMessage({title: 'Saved Successfully',content: 'Invoice created successfully'}));
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to save invoice'}))
    }finally {

    }
}
function* deleteInvoiceFlow(action) {
    const id = action.payload;

    try {
        yield call(deletePInvoice, id);
        console.log('deleted purchase invoice', id);
        yield put(deletePInvoiceSuccess(id));
        yield put(showSuccessMessage({title: 'Invoice Deleted ',content: 'Invoice deleted successfully'}));
    }catch (e) {
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to delete invoice'}));

    }
}


export default purchaseInvoiceWatcher();