import {takeEvery, call, put} from 'redux-saga/effects';
import {DELETE_CUSTOMER, GET_CUSTOMER, GET_CUSTOMER_LIST, SAVE_CUSTOMER, UPDATE_CUSTOMER} from "../actions/types";
import {deleteCustomer, fetchCustomer, fetchCustomerList, postCustomer, updateCustomer} from "../services/customer";
import {
    deleteCustomerSuccess,
    getCustomerListSuccess,
    getCustomerSuccess,
    saveCustomerSuccess,
    updateCustomerSuccess
} from "../actions/customer";



function* customerWatcher(action) {
    yield takeEvery(GET_CUSTOMER_LIST.LOAD, getCustomerListFlow);
    yield takeEvery(GET_CUSTOMER.LOAD, getCustomerFlow);
    yield takeEvery(SAVE_CUSTOMER.LOAD, saveCustomerFlow);
    yield takeEvery(UPDATE_CUSTOMER.LOAD, updateCustomerFlow);
    yield takeEvery(DELETE_CUSTOMER.LOAD, deleteCustomerFlow);
}


function* getCustomerListFlow(action) {
    try {
        const customerList = yield call(fetchCustomerList);
        console.log('customer list', customerList);
        yield put(getCustomerListSuccess(customerList));
    }catch (e) {

    }
}
function* getCustomerFlow(action) {
    const id = action.payload;
    try {
        const customer = yield call(fetchCustomer, id);
        console.log('customer', customer);
        yield put(getCustomerSuccess(customer));
    }catch (e) {

    }
}

function* saveCustomerFlow(action) {
    const customer = action.payload;
    try {
        const id = yield call(postCustomer, customer);
        customer.id = id ;
        console.log('saved customer', customer);
        yield put(saveCustomerSuccess(customer));
    }catch (e) {

    }
}


function* updateCustomerFlow(action) {
    const customer = action.payload;
    try {
        const updatedCustomer = yield call(updateCustomer, customer);
        console.log('updated customer', updatedCustomer);
        yield put(updateCustomerSuccess(updatedCustomer));
    } catch (e) {

    }
}

function* deleteCustomerFlow(action) {
    const id = action.payload;
    try {
        yield call(deleteCustomer, id);
        console.log('deleted customer', id);
        yield put(deleteCustomerSuccess(id));
    }catch (e) {

    }
}


export default customerWatcher();