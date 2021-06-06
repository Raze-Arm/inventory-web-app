import {takeEvery, call, put} from 'redux-saga/effects';
import {GET_PURCHASE_TRANSACTION_PAGE, GET_SALE_TRANSACTION_PAGE, GET_TRANSACTION_PAGE} from "../actions/types";
import {fetchPurchaseTransactionPage, fetchSaleTransactionPage, fetchTransactionPage} from "../services/transaction";
import {getPurchaseTrPageSuccess, getSaleTrPageSuccess, getTransactionPageSuccess} from "../actions/transaction";
import {showModalErrorMessage} from "../actions/app-message";


function* transactionWatcher() {
    yield takeEvery(GET_TRANSACTION_PAGE.LOAD, getTransactionPageFlow);
    yield takeEvery(GET_SALE_TRANSACTION_PAGE.LOAD, getSaleTrFlow);
    yield takeEvery(GET_PURCHASE_TRANSACTION_PAGE.LOAD, getPurchaseTrFlow);
}


function* getTransactionPageFlow(action) {
    const {page, size, sort, search} = action.payload;
    try {
        const transactionPage = yield call(fetchTransactionPage, {page, size, sort, search});
        console.log('transaction page', transactionPage);
        yield put(getTransactionPageSuccess(transactionPage));
    }catch (e) {
        console.log(e);
        yield put(showModalErrorMessage({title: 'Error' , content: 'Failed to get  transaction list', details: e}));

    }
}

function* getSaleTrFlow(action) {
    const {page, size, sort, search} = action.payload;
    try {
        const transactionPage= yield call(fetchSaleTransactionPage, {page, size ,sort, search});
        console.log('sale transaction page', transactionPage);
        yield put(getSaleTrPageSuccess(transactionPage));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'Error' , content: 'Failed to get  transaction list', details: e}));
    }
}

function* getPurchaseTrFlow(action) {
    const {page, size, sort, search} = action.payload;
    try {
        const transactionPage = yield call(fetchPurchaseTransactionPage, {page, size, sort, search});
        console.log('purchase transaction page', transactionPage);
        yield put(getPurchaseTrPageSuccess(transactionPage));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'Error' , content: 'Failed to get  transaction list', details: e}));
    }
}

export default transactionWatcher();