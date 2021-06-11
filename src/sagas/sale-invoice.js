import {takeEvery, call, put} from 'redux-saga/effects';
import {
    DELETE_SALE_INVOICE,
    GET_SALE_INVOICE,
    GET_SALE_INVOICE_LIST,
    GET_SALE_INVOICE_PAGE,
    SAVE_SALE_INVOICE
} from "../actions/types";
import {
    deleteSInvoiceSuccess,
    getSInvoiceListSuccess, getSInvoicePageSuccess,
    getSInvoiceSuccess,
    saveSInvoiceSuccess
} from "../actions/sale-invoice";
import {
    deleteSInvoice,
    fetchSInvoice,
    fetchSInvoiceList,
    fetchSInvoicePage,
    postSInvoice
} from "../services/sale-invoice";
import {showErrorMessage, showModalErrorMessage, showSuccessMessage} from "../actions/app-message";
import history from "../history";


function* saleInvoiceWatcher() {
    yield takeEvery(GET_SALE_INVOICE_PAGE.LOAD , getInvoicePageFlow) ;
    yield takeEvery(GET_SALE_INVOICE_LIST.LOAD, getInvoiceListFlow);
    yield takeEvery(GET_SALE_INVOICE.LOAD, getInvoiceFlow);
    yield takeEvery(SAVE_SALE_INVOICE.LOAD, saveInvoiceFlow);
    yield takeEvery(DELETE_SALE_INVOICE.LOAD, deleteInvoiceFlow);
}

function* getInvoicePageFlow(action) {
    const {page, size, sort, search} = action.payload;
    try {
        const invoicePage = yield call(fetchSInvoicePage, {page, size, sort, search});
        console.log('sale invoice page', invoicePage);
        yield put(getSInvoicePageSuccess(invoicePage));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}));
        history.push('/');
    }
}

function* getInvoiceListFlow(action) {
    try {
        const invoiceList = yield call(fetchSInvoiceList);
        console.log('sale invoice list', invoiceList);
        yield put(getSInvoiceListSuccess(invoiceList));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}));
        history.push('/');
    }
}
function* getInvoiceFlow(action) {
    const id = action.payload;
    try {
        const invoice = yield call(fetchSInvoice, id);
        console.log("sale invoice", invoice);
        yield put(getSInvoiceSuccess(invoice));
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید'}));
        history.push('/sale-invoice');
    }
}
function* saveInvoiceFlow(action) {
    const invoice = action.payload;
    try {
        const id = yield call(postSInvoice, invoice);
        invoice.id = id;
        console.log('saved sale invoice', invoice);
        yield put(saveSInvoiceSuccess(invoice));
        history.push(`/sale-invoice/show/${id}`);
        yield put(showSuccessMessage({title: 'عملیات موفق',content: 'صورتحساب با موفقیت ایجاد شد'}));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: JSON.stringify(e.response.data)}));
        // history.push('/sale-invoice');
    }
}
function* deleteInvoiceFlow(action) {
    const id = action.payload;

    try {
        yield call(deleteSInvoice, id);
        console.log('deleted sale invoice', id);
        yield put(deleteSInvoiceSuccess(id));
        history.push('/sale-invoice');
        yield put(showSuccessMessage({title: 'عملیات موفق',content: 'صورتحساب با موفقیت حذف شد'}));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}))
        history.push('/sale-invoice');
    }
}


export default saleInvoiceWatcher();