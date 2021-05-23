import Api from '../apis/inventory-api';

export const fetchSInvoiceList = async () => {
    const response = await Api.get('/sale-invoice');
    return response.data;
}

export const fetchSInvoice = async (id) => {
    const response = await Api.get(`/sale-invoice/${id}`);
    return response.data;
}
export const postSInvoice = async (invoice) => {
    const response = await Api.post(`/sale-invoice`, {invoice});
    return response.data;
}

export const deleteSInvoice = async (id) => {
    const response = await Api.delete(`/sale-invoice/${id}`);
    return response.data;
}

