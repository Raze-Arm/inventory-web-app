import Api from '../apis/inventory-api';


export const fetchSupplierList = async () => {
    const response = await Api.get('/supplier');
    return response.data;
}

export const fetchSupplier = async (id) => {
    const response = await Api.get(`/supplier/${id}`);
    return response.data;
}

export const postSupplier = async (supplier)  => {
    const response = await Api.post(`/supplier`, {supplier});
    return response.data;
}

export const updateSupplier = async (supplier) => {
    const response = await Api.put(`supplier` , {supplier});
    return response.data;
}

export const deleteSupplier = async (id) => {
    const response = await Api.delete(`/supplier/${id}`);
    return response.data;
}




