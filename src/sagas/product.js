import {takeEvery, call, put} from 'redux-saga/effects';
import {
    DELETE_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCT_LIST,
    GET_PRODUCT_PAGE,
    SAVE_PRODUCT,
    UPDATE_PRODUCT
} from "../actions/types";
import {
    deleteProduct,
    fetchProduct,
    fetchProductList,
    fetchProductPage,
    postProduct,
    updateProduct
} from "../services/product";
import {
    deleteProductSuccess,
    getProductListSuccess,
    getProductPageSuccess,
    getProductSuccess,
    saveProductSuccess, updateProductSuccess
} from "../actions/product";
import {showErrorMessage, showSuccessMessage} from "../actions/app-message";


function* productWatcher() {
    yield takeEvery(GET_PRODUCT_PAGE.LOAD, getProductPageFlow);
    yield takeEvery(GET_PRODUCT_LIST.LOAD, getProductListFlow);
    yield takeEvery(GET_PRODUCT.LOAD, getProductFlow);
    yield takeEvery(SAVE_PRODUCT.LOAD, saveProductFlow);
    yield takeEvery(UPDATE_PRODUCT.LOAD, updateProductFlow);
    yield takeEvery(DELETE_PRODUCT.LOAD, deleteProductFlow);
}

function* getProductPageFlow(action) {
    const {page, size, sort, search} = action.payload;
    try {
        const productPage = yield call(fetchProductPage, {page, size, sort, search});
        console.log('product page', productPage);
        yield put(getProductPageSuccess(productPage));
    }catch (e) {

    }
}

function* getProductListFlow(action) {
    try {
        const productList = yield call(fetchProductList);
        console.log('product list', productList);
        yield put(getProductListSuccess(productList));
    }catch (e) {

    }
}
function* getProductFlow(action) {
    const id = action.payload;
    try {
        const product = yield call(fetchProduct, id);
        console.log('product', product);
        yield put(getProductSuccess(product));
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to show product'}));
    }
}

function* saveProductFlow(action) {
    const product = action.payload;
    try {
        const id = yield call(postProduct, product);
        product.id = id ;
        console.log('saved product', product);
        yield put(saveProductSuccess(product));
        yield put(showSuccessMessage({title: 'Saved Successfully',content: 'Product created successfully'}));
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to save product'}));
    }
}


function* updateProductFlow(action) {
    const product = action.payload;
    try {
        const updatedProduct = yield call(updateProduct, product);
        console.log('updated product', updatedProduct);
        yield put(updateProductSuccess(updatedProduct));
        yield put(showSuccessMessage({title: 'Updated Successfully',content: 'Product updated successfully'}));
    } catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to update product'}));
    }
}

function* deleteProductFlow(action) {
    const id = action.payload;
    try {
        yield call(deleteProduct, id);
        console.log('deleted product', id);
        yield put(deleteProductSuccess(id));
        yield put(showSuccessMessage({title: 'Product Deleted ',content: 'Product deleted successfully'}));
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to delete product'}));
    }
}

export default productWatcher();