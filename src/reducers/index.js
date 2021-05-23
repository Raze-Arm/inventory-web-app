import {combineReducers} from "redux";
import {reducer as formReducer} from 'redux-form';
import {purchaseInvoiceReducer} from "./purchase-invoice";


export default combineReducers({
    form: formReducer,
    purchaseInvoice: purchaseInvoiceReducer
})