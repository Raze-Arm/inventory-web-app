import {DELETE_PRODUCT, GET_PRODUCT, GET_PRODUCT_LIST, GET_PRODUCT_PAGE, SAVE_PRODUCT, UPDATE_PRODUCT} from "./types";

export const getProductPage = ({page, size,sort = 'id',search = ''}) => {
    return {type: GET_PRODUCT_PAGE.LOAD, payload: {page, size,sort ,search }};
}


export const getProductPageSuccess = (productPage) => {
    return {type: GET_PRODUCT_PAGE.SUCCESS, payload: productPage};
}
export const getProductPageFailed = (error) => {
    return {type: GET_PRODUCT_PAGE.FAILED, payload: error};
}

export const getProductList = () => {
    return {type: GET_PRODUCT_LIST.LOAD};
}
export const getProductListSuccess = (productList) => {
    return {type: GET_PRODUCT_LIST.SUCCESS, payload: productList};
}
export const getProductListFailed = (error) => {
    return {type: GET_PRODUCT_LIST.FAILED, payload: error};
}

export const getProduct = (id) => {
    return {type: GET_PRODUCT.LOAD, payload: id};
}
export const getProductSuccess = (product) => {
    return {type: GET_PRODUCT.SUCCESS, payload: product};
}
export const getProductFailed = (error) => {
    return {type: GET_PRODUCT.FAILED, payload: error};
}


export const saveProduct = (product) => {
    return {type: SAVE_PRODUCT.LOAD, payload: product};
}
export const saveProductSuccess = (product) => {
    return {type: SAVE_PRODUCT.SUCCESS, payload: product};
}
export const saveProductFailed = (error) => {
    return {type: SAVE_PRODUCT.FAILED, payload: error};
}


export const updateProduct = (product) => {
    return {type: UPDATE_PRODUCT.LOAD, payload: product};
}
export const updateProductSuccess = (product) => {
    return {type: UPDATE_PRODUCT.SUCCESS, payload: product};
}
export const updateProductFailed = (error) => {
    return {type: UPDATE_PRODUCT.FAILED, payload: error};
}


export const deleteProduct = (id) => {
    return {type: DELETE_PRODUCT.LOAD, payload: id};
}
export const deleteProductSuccess = (id) => {
    return {type: DELETE_PRODUCT.SUCCESS, payload: id};
}

export const deleteProductFailed = (error) => {
    return {type: DELETE_PRODUCT.FAILED, payload: error};
}


