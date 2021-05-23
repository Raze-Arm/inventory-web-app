import {combineReducers} from "redux";
import {reducer as formReducer} from 'redux-form';
import {purchaseInvoiceReducer} from "./purchase-invoice";
import {saleInvoiceReducer} from './sale-invoice';
import {customerReducer} from "./customerReducer";
import {supplierReducer} from "./supplierReducer";

export default combineReducers({
    form: formReducer,
    purchaseInvoice: purchaseInvoiceReducer,
    saleInvoice: saleInvoiceReducer,
    customer: customerReducer,
    supplier: supplierReducer

})