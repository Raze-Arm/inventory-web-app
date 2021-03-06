import {takeEvery, call, put} from 'redux-saga/effects';
import {
    DELETE_SUPPLIER,
    GET_SUPPLIER,
    GET_SUPPLIER_LIST,
    GET_SUPPLIER_PAGE,
    SAVE_SUPPLIER,
    UPDATE_SUPPLIER
} from "../actions/types";
import {
    deleteSupplier,
    fetchSupplier,
    fetchSupplierList,
    fetchSupplierPage,
    postSupplier,
    updateSupplier
} from "../services/supplier";
import {
    deleteSupplierSuccess,
    getSupplierListSuccess, getSupplierPageSuccess,
    getSupplierSuccess,
    saveSupplierSuccess,
    updateSupplierSuccess
} from "../actions/supplier";
import {showErrorMessage, showModalErrorMessage, showSuccessMessage} from "../actions/app-message";
import history from "../history";



function* supplierWatcher() {
    yield takeEvery(GET_SUPPLIER_PAGE.LOAD, getSupplierPageFlow);
    yield takeEvery(GET_SUPPLIER_LIST.LOAD, getSupplierListFlow);
    yield takeEvery(GET_SUPPLIER.LOAD, getSupplierFlow);
    yield takeEvery(SAVE_SUPPLIER.LOAD, saveSupplierFlow);
    yield takeEvery(UPDATE_SUPPLIER.LOAD, updateSupplierFlow);
    yield takeEvery(DELETE_SUPPLIER.LOAD, deleteSupplierFlow);
}

function* getSupplierPageFlow(action) {
    const {page, size, sort, search} = action.payload;;
    try {
        const supplierPage = yield call(fetchSupplierPage, {page, size, sort, search});
        console.log('supplier page', supplierPage);
        yield put(getSupplierPageSuccess(supplierPage));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}));
        history.push('/');
    }
}

function* getSupplierListFlow(action) {
    try {
        const supplierList = yield call(fetchSupplierList);
        console.log('supplier list', supplierList);
        yield put(getSupplierListSuccess(supplierList));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}));
        history.push('/');
    }
}

function* getSupplierFlow(action) {
    const id = action.payload;
    try {
        const supplier =  yield call(fetchSupplier, id);
        console.log('supplier', supplier);
        yield put(getSupplierSuccess(supplier));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}));
        history.push('/supplier');
    }
}

function* saveSupplierFlow(action) {
    const supplier = action.payload;
    try {
        const id = yield call(postSupplier, supplier);
        supplier.id = id;
        console.log('saved supplier', supplier);
        yield put(saveSupplierSuccess(supplier));
        history.push(`/supplier/show/${id}`);
        yield put(showSuccessMessage({title: 'عملیات موفق',content: 'فروشنده با موفقیت ایجاد شد'}));
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید'}));
        history.push('/supplier');
    }
}

function* updateSupplierFlow(action) {
    const supplier = action.payload;
    try {
        const updatedSupplier = yield call(updateSupplier, supplier);
        console.log('updated supplier', updatedSupplier);
        yield put(updateSupplierSuccess(supplier));
        yield put(showSuccessMessage({title: 'عملیات موفق',content: 'فروشنده با موفقیت ویرایش شد'}));
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید'}));
        history.push('/supplier');
    }
}

function* deleteSupplierFlow(action) {
    const id = action.payload;
    try {
        yield call(deleteSupplier, id);
        console.log('deleted supplier', id);
        yield put(deleteSupplierSuccess(id));
        history.push('/supplier');
        yield put(showSuccessMessage({title: 'عملیات موفق',content: 'فروشنده با موفقیت حذف شد'}));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}));
        history.push('/supplier');
    }
}

export default supplierWatcher();