import {all} from 'redux-saga/effects';
import purchaseInvoiceWatcher from './purchase-invoice';

export default function* () {
    yield all([purchaseInvoiceWatcher]);
}

