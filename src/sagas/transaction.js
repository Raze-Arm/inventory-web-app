import {takeEvery, call, put} from 'redux-saga/effects';
import {GET_TRANSACTION_PAGE} from "../actions/types";
import {fetchTransactionPage} from "../services/transaction";
import {getTransactionPageSuccess} from "../actions/transaction";


function* transactionWatcher() {
    yield takeEvery(GET_TRANSACTION_PAGE.LOAD, getTransactionPageFlow);
}


function* getTransactionPageFlow(action) {
    const {page, size, sort, search} = action.payload;
    try {
        const transactionPage = yield call(fetchTransactionPage, {page, size, sort, search});
        console.log('transaction page', transactionPage);
        yield put(getTransactionPageSuccess(transactionPage));
    }catch (e) {

    }
}

export default transactionWatcher();