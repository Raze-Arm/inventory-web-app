import Api from '../apis/inventory-api';
const VER ='/v1'

export const fetchSInvoicePage = async ({page, size, sort, search}) => {
    const response = await Api.get(VER + '/sale-invoice', {params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}


export const fetchSInvoiceList = async () => {
    const response = await Api.get(VER + '/sale-invoice' ,{params: {'search-type': 'list'}});
    return response.data;
}

export const fetchSInvoice = async (id) => {
    const response = await Api.get(VER + `/sale-invoice/${id}`);
    return response.data;
}
export const postSInvoice = async (invoice) => {
    const response = await Api.post(VER + `/sale-invoice`, invoice);
    return response.data;
}

export const deleteSInvoice = async (id) => {
    const response = await Api.delete(VER + `/sale-invoice/${id}`);
    return response.data;
}

