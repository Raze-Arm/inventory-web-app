import {
    DELETE_CUSTOMER,
    GET_CUSTOMER,
    GET_CUSTOMER_LIST,
    GET_CUSTOMER_PAGE,
    SAVE_CUSTOMER,
    UPDATE_CUSTOMER
} from "./types";


export const getCustomerPage = ({page, size,sort = 'id',search = ''}) => {
    return {type: GET_CUSTOMER_PAGE.LOAD, payload: {page, size,sort ,search }};
}

export const getCustomerPageSuccess = (customerPage) => {
    return {type: GET_CUSTOMER_PAGE.SUCCESS, payload: customerPage};
}
export const getCustomerPageFailed = (error) => {
    return {type: GET_CUSTOMER_PAGE.FAILED, payload: error};
}

export const getCustomerList = () => {
    return {type: GET_CUSTOMER_LIST.LOAD};
}

export const getCustomerListSuccess = (customerList) => {
    return {type: GET_CUSTOMER_LIST.SUCCESS, payload: customerList};
}
export const getCustomerListFailed = (error) => {
    return {type: GET_CUSTOMER_LIST.FAILED, payload: error};
}

export const getCustomer = (id) => {
    return {type: GET_CUSTOMER.LOAD, payload: id};
}
export const getCustomerSuccess = (customer) => {
    return {type: GET_CUSTOMER.SUCCESS, payload: customer};
}
export const getCustomerFailed = (error) => {
    return {type: GET_CUSTOMER.FAILED, payload: error};
}

export const saveCustomer = (customer) => {
    return {type: SAVE_CUSTOMER.LOAD, payload: customer};
}
export const saveCustomerSuccess = (customer) => {
    return {type: SAVE_CUSTOMER.SUCCESS, payload: customer};
}
export const saveCustomerFailed = (error) => {
    return {type: SAVE_CUSTOMER.FAILED, payload: error};
}

export const updateCustomer = (customer) => {
    return {type: UPDATE_CUSTOMER.LOAD, payload: customer };
}
export const updateCustomerSuccess = (customer) => {
    return {type: UPDATE_CUSTOMER.SUCCESS , payload: customer};
}
export const updateCustomerFailed = (error) => {
    return {type: UPDATE_CUSTOMER.FAILED, payload: error};
}

export const deleteCustomer = (id) => {
    return {type: DELETE_CUSTOMER.LOAD, payload: id};
}
export const deleteCustomerSuccess = (id) => {
    return {type: DELETE_CUSTOMER.SUCCESS, payload: id};
}
export const deleteCustomerFailed = (error) => {
    return {type: DELETE_CUSTOMER.FAILED, payload: error};
}