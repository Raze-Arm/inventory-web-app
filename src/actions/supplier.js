import {
    DELETE_SUPPLIER,
    GET_SUPPLIER,
    GET_SUPPLIER_LIST,
    GET_SUPPLIER_PAGE,
    SAVE_SUPPLIER,
    UPDATE_SUPPLIER
} from "./types";

export const getSupplierPage = ({page, size,sort = 'id',search = ''}) => {
    return {type: GET_SUPPLIER_PAGE.LOAD, payload: {page, size,sort ,search}};
}
export const getSupplierPageSuccess = (supplierPage) => {
    return {type: GET_SUPPLIER_PAGE.SUCCESS, payload: supplierPage};
}
export const getSupplierPageFailed = (error) => {
    return {type: GET_SUPPLIER_PAGE.FAILED, payload: error};
}


export const getSupplierList = () => {
    return {type: GET_SUPPLIER_LIST.LOAD};
}

export const getSupplierListSuccess = (supplierList) => {
    return {type: GET_SUPPLIER_LIST.SUCCESS, payload: supplierList};
}
export const getSupplierListFailed = (error) => {
    return {type: GET_SUPPLIER_LIST.FAILED, payload: error};
}

export const getSupplier = (id) => {
    return {type: GET_SUPPLIER.LOAD, payload: id};
}
export const getSupplierSuccess = (supplier) => {
    return {type: GET_SUPPLIER.SUCCESS, payload: supplier};
}

export const getSupplierFailed = (error) => {
    return {type: GET_SUPPLIER.FAILED, payload: error};
}


export const saveSupplier = (supplier) => {
    return {type: SAVE_SUPPLIER.LOAD, payload: supplier};
}
export const saveSupplierSuccess = (supplier) => {
    return {type: SAVE_SUPPLIER.SUCCESS, payload: supplier};
}
export const saveSupplierFailed = (error) => {
    return {type: SAVE_SUPPLIER.FAILED, payload: error};
}

export const updateSupplier = (supplier) => {
    return {type: UPDATE_SUPPLIER.LOAD, payload: supplier};
}
export const updateSupplierSuccess = (supplier) => {
    return {type: UPDATE_SUPPLIER.SUCCESS, payload: supplier};
}

export const updateSupplierFailed = (error) => {
    return {type: UPDATE_SUPPLIER.FAILED, payload: error};
}


export const deleteSupplier = (id) => {
    return {type: DELETE_SUPPLIER.LOAD, payload: id};
}
export const deleteSupplierSuccess = (id) => {
    return {type: DELETE_SUPPLIER.SUCCESS, payload: id};
}
export const deleteSupplierFailed = (error) => {
    return {type: DELETE_SUPPLIER.FAILED, payload: error};
}