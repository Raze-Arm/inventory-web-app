import {all} from 'redux-saga/effects';
import purchaseInvoiceWatcher from './purchase-invoice';
import saleInvoiceWatcher from './sale-invoice';
import supplierWatcher from './supplier';
import customerWatcher from './customer';
import productWatcher from './product';
import invoiceWatcher from './invoice';
import transactionWatcher from './transaction';
import profileWatcher from './profile';
import authWatcher from "./auth";


export default function* () {
    yield all(
        [purchaseInvoiceWatcher, saleInvoiceWatcher, supplierWatcher
            , customerWatcher, productWatcher, invoiceWatcher
            , transactionWatcher, authWatcher, profileWatcher]
    );
}

