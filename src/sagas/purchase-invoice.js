import {takeEvery, call, put} from 'redux-saga/effects';
import {
    DELETE_PURCHASE_INVOICE,
    GET_PURCHASE_INVOICE,
    GET_PURCHASE_INVOICE_LIST, GET_PURCHASE_INVOICE_PAGE,
    SAVE_PURCHASE_INVOICE
} from "../actions/types";
import {
    deletePInvoice,
    fetchPInvoice,
    fetchPInvoiceList,
    fetchPInvoicePage,
    postPInvoice
} from "../services/purchase-invoice";
import {
    deletePInvoiceSuccess,
    getPInvoiceListSuccess, getPInvoicePageSuccess,
    getPInvoicesSuccess,
    savePInvoiceSuccess
} from "../actions/purchase-invoice";
import {showErrorMessage, showModalErrorMessage, showSuccessMessage} from "../actions/app-message";
import history from "../history";


function* purchaseInvoiceWatcher() {
    yield takeEvery(GET_PURCHASE_INVOICE_PAGE.LOAD, getInvoicePageFlow);
    yield takeEvery(GET_PURCHASE_INVOICE_LIST.LOAD , getInvoiceListFlow);
    yield takeEvery(GET_PURCHASE_INVOICE.LOAD , getInvoiceFlow);
    yield takeEvery(SAVE_PURCHASE_INVOICE.LOAD , saveInvoiceFlow);
    yield takeEvery(DELETE_PURCHASE_INVOICE.LOAD , deleteInvoiceFlow);

}

function* getInvoicePageFlow(action) {
    const {page, size, sort, search} = action.payload;
    try {
        const invoicePage = yield call(fetchPInvoicePage, {page, size, sort, search});
        console.log('purchase invoice page', invoicePage);
        yield put(getPInvoicePageSuccess(invoicePage));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}));
        history.push('/');
    }
}


function* getInvoiceListFlow(action) {
    try {
        const invoiceList = yield call(fetchPInvoiceList);
        console.log('purchase invoice list', invoiceList);
        yield put(getPInvoiceListSuccess(invoiceList));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}));
        history.push('/');
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
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}));
        history.push('/purchase-invoice');
    }
}
function* saveInvoiceFlow(action) {
    const invoice = action.payload;
    try {
        const id = yield call(postPInvoice, invoice);
        invoice.id = id;
        console.log('saved invoice', invoice);
        yield put(savePInvoiceSuccess(invoice));
        history.push(`/purchase-invoice/show/${id}`);
        yield put(showSuccessMessage({title: 'عملیات موفق',content: 'صورتحساب با موفقیت ایجاد شد'}));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید' , details: JSON.stringify(e.response.data)}))
        // history.push('/purchase-invoice');
    }finally {

    }
}
function* deleteInvoiceFlow(action) {
    const id = action.payload;

    try {
        yield call(deletePInvoice, id);
        console.log('deleted purchase invoice', id);
        yield put(deletePInvoiceSuccess(id));
        history.push('/purchase-invoice');
        yield put(showSuccessMessage({title: 'عملیات موفق',content: 'صورتحساب با موفقیت حذف شد'}));
    }catch (e) {
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}));
        history.push('/purchase-invoice');

    }
}


export default purchaseInvoiceWatcher();