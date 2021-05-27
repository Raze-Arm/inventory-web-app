import Api from '../apis/inventory-api';


export const fetchInvoicePage = async ({page, size, sort, search}) => {
    const response = await Api.get(`/invoice`, { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}