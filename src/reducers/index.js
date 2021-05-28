import {combineReducers} from "redux";
import {reducer as formReducer} from 'redux-form';
import {purchaseInvoiceReducer} from "./purchase-invoice";
import {saleInvoiceReducer} from './sale-invoice';
import {customerReducer} from "./customer";
import {supplierReducer} from "./supplier";
import {productReducer} from "./product";
import {appMessageReducer} from "./app-message";
import  {invoiceReducer} from "./invoice";
import {transactionReducer} from "./transaction";
import {authReducer} from "./auth";
import {profileReducer} from "./profile";

export default combineReducers({
    form: formReducer,
    purchaseInvoice: purchaseInvoiceReducer,
    saleInvoice: saleInvoiceReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    product: productReducer,
    message: appMessageReducer,
    invoice: invoiceReducer,
    transaction: transactionReducer,
    profile: profileReducer,
    auth: authReducer,

})