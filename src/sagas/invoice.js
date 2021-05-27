import {takeEvery, call, put} from 'redux-saga/effects';
import {GET_INVOICE_PAGE} from "../actions/types";
import {fetchInvoicePage} from "../services/invoice";
import {getInvoicePageSuccess} from "../actions/invoice";



function* invoiceWatcher() {
    yield takeEvery(GET_INVOICE_PAGE.LOAD, getInvoicePageFlow);
}


function* getInvoicePageFlow(action) {
    const {page, size, sort, search} = action.payload;
    try {
        const invoicePage = yield call(fetchInvoicePage, {page, size, sort, search});
        console.log('invoice page', invoicePage);
        yield put(getInvoicePageSuccess(invoicePage));
    } catch (e) {

    }
}


export default invoiceWatcher();