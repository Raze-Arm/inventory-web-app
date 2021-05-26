import Api from '../apis/inventory-api';

export const fetchCustomerPage = async ({page, size,sort, search}) => {
    const response = await Api.get(`/customer` , { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}


export const fetchCustomerList = async () => {
    const response = await Api.get('/customer' ,{params: {'search-type': 'list'}});
    return response.data;
}
export const fetchCustomer = async (id) => {
    const response = await Api.get(`/customer/${id}`);
    return response.data;
}

export const postCustomer = async (customer)  => {
    const response = await Api.post(`/customer`, customer);
    return response.data;
}
export const updateCustomer = async (customer) => {
    const response = await Api.put(`customer` , customer);
    return response.data;
}

export const deleteCustomer = async (id) => {
    const response = await Api.delete(`/customer/${id}`);
    return response.data;
}