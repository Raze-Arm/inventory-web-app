import {combineReducers} from "redux";
import {reducer as formReducer} from 'redux-form';
import {purchaseInvoiceReducer} from "./purchase-invoice";
import {saleInvoiceReducer} from './sale-invoice';
import {customerReducer} from "./customer";
import {supplierReducer} from "./supplier";
import {productReducer} from "./product";
import {appMessageReducer} from "./app-message";

export default combineReducers({
    form: formReducer,
    purchaseInvoice: purchaseInvoiceReducer,
    saleInvoice: saleInvoiceReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    product: productReducer,
    message: appMessageReducer,

})