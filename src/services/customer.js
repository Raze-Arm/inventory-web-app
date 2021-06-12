import Api from '../apis/inventory-api';

const VER ='/v1'

export const fetchCustomerPage = async ({page, size,sort, search}) => {
    const response = await Api.get(VER + `/customer` , { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}


export const fetchCustomerList = async () => {
    const response = await Api.get(VER + '/customer' ,{params: {'search-type': 'list'}});
    return response.data;
}
export const fetchCustomer = async (id) => {
    const response = await Api.get(VER + `/customer/${id}`);
    return response.data;
}

export const postCustomer = async (customer)  => {
    const response = await Api.post(VER + `/customer`, customer);
    return response.data;
}
export const updateCustomer = async (customer) => {
    const response = await Api.put(VER + `/customer` , customer);
    return response.data;
}

export const deleteCustomer = async (id) => {
    const response = await Api.delete(VER + `/customer/${id}`);
    return response.data;
}