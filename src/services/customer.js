import Api from '../apis/inventory-api';


export const fetchCustomerList = async () => {
    const response = await Api.get('/customer');
    return response.data;
}
export const fetchCustomer = async (id) => {
    const response = await Api.get(`/customer/${id}`);
    return response.data;
}

export const postCustomer = async (customer)  => {
    const response = await Api.post(`/customer`, {customer});
    return response.data;
}
export const updateCustomer = async (customer) => {
    const response = await Api.put(`customer` , {customer});
    return response.data;
}

export const deleteCustomer = async (id) => {
    const response = await Api.delete(`/customer/${id}`);
    return response.data;
}