import Api from '../apis/inventory-api';



export const fetchPInvoiceList = async () => {
    const response = await Api.get('/purchase-invoice');
    return response.data;
}

export const fetchPInvoice = async (id) => {
    const response = await Api.get(`/purchase-invoice/${id}`);
    return response.data;
}

export const postPInvoice = async (invoice) => {
    const response = await Api.post(`/purchase-invoice`, {invoice});
    return response.data;
}

export const deletePInvoice = async (id) => {
    const response = await Api.delete(`/purchase-invoice/${id}`);
    return response.data;
}