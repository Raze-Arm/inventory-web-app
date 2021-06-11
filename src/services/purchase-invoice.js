import Api from '../apis/inventory-api';
const VER ='/v1'

export const fetchPInvoicePage =  async ({page, size, sort, search}) => {
    const response = await Api.get(VER + '/purchase-invoice', {params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}

export const fetchPInvoiceList = async () => {
    const response = await Api.get(VER + '/purchase-invoice' ,{params: {'search-type': 'list'}});
    return response.data;
}

export const fetchPInvoice = async (id) => {
    const response = await Api.get(VER + `/purchase-invoice/${id}`);
    return response.data;
}

export const postPInvoice = async (invoice) => {
    console.log('posting invoice ', invoice);
    const response = await Api.post(VER + `/purchase-invoice`, invoice, );
    return response.data;
}

export const deletePInvoice = async (id) => {
    const response = await Api.delete(VER + `/purchase-invoice/${id}`);
    return response.data;
}